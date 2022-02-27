/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Certificate, PublicKey } from '@fidm/x509'
import cose from 'cose-js'
import moment from 'moment'
import dscListDemoJson from '../data/dsc-demo.json'
import dscListJson from '../data/dsc.json'
import { app } from '../state/app'
import {
  CERTIFICATE_TYPE_RECOVERY,
  CERTIFICATE_TYPE_TEST,
  CERTIFICATE_TYPE_VACCINATION,
  IMMUNIZATION_STATUS_BOOSTER,
} from './builder/types'
import { CertLogic, ICertLogic } from './certlogic'
import { DCC } from './dcc'
import { chunkSubstr, getCertificateType } from './helper'

export type DSC = {
  kid: string
  rawData: string
  country: string
}

export interface IDCCScannerConfig {
  /**
   * List of DSCs to verify the DCC
   *
   * @returns List of DSCs | null will disable the verification
   */
  dscList: () => DSC[] | null

  /**
   * Selected country
   *
   * @return string
   */
  country: () => string

  /**
   * Selected state
   *
   * @return string
   */
  state: () => string

  /**
   * Selected purpose
   *
   * @return string
   */
  purpose: () => string

  /**
   * Exclude people with booster from providing an additional test certificate
   *
   * @return string
   */
  excludeBooster: () => boolean

  /**
   * Validation clock
   *
   * @return Date
   */
  validationClock: () => Date
}

export class DCCScannerConfig implements IDCCScannerConfig {
  dscList(): DSC[] | null {
    if (process.env.NEXT_PUBLIC_DEBUG_DSC == 'true') {
      return (
        dscListDemoJson as {
          certificates: DSC[]
        }
      ).certificates
    }
    return (
      dscListJson as {
        certificates: DSC[]
      }
    ).certificates
  }
  country(): string {
    return app.get().country
  }
  state(): string {
    return app.get().state
  }
  purpose(): string {
    return app.get().purpose
  }
  excludeBooster(): boolean {
    return app.get().excludeBooster
  }
  validationClock(): Date {
    return new Date()
  }
}

export class DCCVerifyError extends Error {
  name: string = 'DCCVerifyError'
}
export class DCCExpiredError extends Error {
  name: string = 'DCCExpiredError'
}
export class DCCValidationError extends Error {
  name: string = 'DCCValidationError'
}
export class DCCNoValidationError extends Error {
  name: string = 'DCCNoValidationError'
}
export class DCCPurposeError extends Error {
  name: string = 'DCCPurposeError'
}
export class DCCWrongMultiscanError extends Error {
  name: string = 'DCCWrongMultiscanError'
}

export interface IDCCScanner {
  /**
   * DCCScanner config
   */
  config: IDCCScannerConfig

  /**
   * CertLogic
   */
  certLogic: ICertLogic

  /**
   * List of certificates of current scan series
   */
  certificates: DCC[]

  /**
   * Parse, verify, and validate DCC against selected rules
   *
   * @param data - Scanned QR code data
   * @throws DCCParseError
   * @throws DCCVerifyError
   * @throws DCCExpiredError
   * @throws DCCValidationError
   * @throws DCCNoValidationError
   * @throws DCCPurposeError
   */
  scan: (data: string) => Promise<void>

  /**
   * Validate dcc type for current purpose, e.g. 1G only allows vaccination certificates.
   *
   * @param dcc - The DCC to be checked
   * @returns true, if dcc type is valid
   */
  validateDCCPurpose: (dcc: DCC) => boolean

  /**
   * Check if multiscan is necessary for given DCC scan series.
   * In case of a + Purpose, like 2G+ in Germany, the user has to scan a test certificate in certain situations.
   *
   * @returns Array of certificate types if multiscan is necessary
   */
  isMultiScanNecessary: () => string[]

  /**
   * Clear current scan series
   */
  clear: () => void
}

export class DCCScanner implements IDCCScanner {
  config: IDCCScannerConfig
  certLogic: ICertLogic
  certificates: DCC[] = []

  constructor(
    config: IDCCScannerConfig = new DCCScannerConfig(),
    certLogic: ICertLogic = new CertLogic()
  ) {
    this.config = config
    this.certLogic = certLogic
  }

  async scan(data: string): Promise<void> {
    // parse dcc
    const dcc = new DCC(data)
    // then check
    await this.check(dcc)
  }

  async check(dcc: DCC): Promise<void> {
    // verify dcc
    const isExpired = dcc.data.payload.exp ? moment() > moment.unix(dcc.data.payload.exp) : false
    if (isExpired) {
      // certificate is expired
      throw new DCCExpiredError()
    }
    const verified = await this.verifyDCC(dcc)
    if (!verified) {
      // verification failed
      throw new DCCVerifyError()
    }

    // validate dcc against selected rules
    const ruleResult = this.certLogic.validateDCC(
      dcc,
      this.config.country(),
      this.config.state(),
      this.config.validationClock()
    )
    if (ruleResult.results.length === 0) {
      // no rules validated; manual check required
      throw new DCCNoValidationError()
    }
    if (!ruleResult.isValid) {
      // rule validation failed
      throw new DCCValidationError()
    }

    // validate dcc type for purpose
    const validPurpose = this.validateDCCPurpose(dcc)
    if (!validPurpose) {
      // dcc type is not valid for the current purpose
      throw new DCCPurposeError()
    }

    // validate dcc against current multiscan requirements
    const multiscan = this.isMultiScanNecessary()
    if (multiscan.length > 0) {
      if (!multiscan.includes(getCertificateType(dcc.data.payload.hcert.dgc))) {
        // scanned dcc does not match the multiscan requirements
        throw new DCCWrongMultiscanError()
      }
    }

    this.certificates.push(dcc)
  }

  /**
   * Validate dcc type for current purpose, e.g. 1G only allows vaccination certificates.
   *
   * @param dcc - The DCC to be checked
   * @returns true, if dcc type is valid
   */
  validateDCCPurpose(dcc: DCC): boolean {
    const certificateType = getCertificateType(dcc.data.payload.hcert.dgc)
    switch (this.config.purpose()) {
      case '1G':
        if (certificateType === CERTIFICATE_TYPE_VACCINATION) {
          return true
        }
        break
      case '1G+':
        if (
          certificateType === CERTIFICATE_TYPE_VACCINATION ||
          certificateType === CERTIFICATE_TYPE_TEST
        ) {
          return true
        }
        break
      case '2G':
        if (
          certificateType === CERTIFICATE_TYPE_VACCINATION ||
          certificateType === CERTIFICATE_TYPE_RECOVERY
        ) {
          return true
        }
        break
      case '2G+':
      case '3G':
        return true
      default:
        break
    }
    return false
  }

  isMultiScanNecessary(): string[] {
    // Do not scan another certificate if we alrady have two valid certificates or none at all
    if (this.certificates.length == 0 || this.certificates.length > 1) return []

    const certificateType = getCertificateType(this.certificates[0].data.payload.hcert.dgc)

    if (this.config.purpose().toUpperCase() == '1G+') {
      if (certificateType === CERTIFICATE_TYPE_VACCINATION) {
        // Check if immunization status of current certificate is a booster, if not we need to scan a test certificate
        const immunizationStatus = this.certLogic.validateImmunizationRules(
          this.certificates[0],
          this.config.country(),
          this.config.state()
        )
        if (immunizationStatus !== IMMUNIZATION_STATUS_BOOSTER || !this.config.excludeBooster()) {
          return [CERTIFICATE_TYPE_TEST]
        }
      }
      if (certificateType === CERTIFICATE_TYPE_TEST) {
        // user scanned the test certificate first, now we need the vaccination certificate
        const isRecovery = this.certLogic.validateRecoveryRules(
          this.certificates[0],
          this.config.country(),
          this.config.state()
        )
        if (isRecovery) {
          // current certificate is considered a recovery, but we need a negative test certificate
          return []
        }
        return [CERTIFICATE_TYPE_VACCINATION]
      }
    }

    if (this.config.purpose().toUpperCase() == '2G+') {
      if (certificateType === CERTIFICATE_TYPE_VACCINATION) {
        // Check if immunization status of current certificate is a booster, if not we need to scan a test certificate
        const immunizationStatus = this.certLogic.validateImmunizationRules(
          this.certificates[0],
          this.config.country(),
          this.config.state()
        )
        if (immunizationStatus !== IMMUNIZATION_STATUS_BOOSTER || !this.config.excludeBooster()) {
          return [CERTIFICATE_TYPE_TEST]
        }
      }
      if (certificateType === CERTIFICATE_TYPE_RECOVERY) {
        // TODO check what rules are required, at the moment we require a test certificate for all recovery certificates
        return [CERTIFICATE_TYPE_TEST]
      }
      if (certificateType === CERTIFICATE_TYPE_TEST) {
        // user scanned the test certificate first

        // Check if the test certificate is considered a recovery certificate
        const isRecovery = this.certLogic.validateRecoveryRules(
          this.certificates[0],
          this.config.country(),
          this.config.state()
        )
        if (isRecovery) {
          // current certificate is considered a recovery, we need an additional negative test certificate
          return [CERTIFICATE_TYPE_TEST]
        }

        // if not, then we need a vaccination or recovery certificate
        return [CERTIFICATE_TYPE_VACCINATION, CERTIFICATE_TYPE_RECOVERY]
      }
    }

    // no multiscan necessary
    return []
  }

  clear(): void {
    this.certificates = []
  }

  /**
   * Verify DCC with digital signing certificates (DSCs)
   *
   * @param dcc - Users DCC
   * @returns True, if DCC is signed with a valid key
   */
  private async verifyDCC(dcc: DCC): Promise<boolean> {
    const dscList = this.config.dscList()
    if (dscList === null) {
      console.log('DEBUG - DCC verification disabled')
      return true
    }
    const keyByKid = dscList.find(cert => cert.kid == dcc.data.header.kid)
    const certList = keyByKid
      ? [keyByKid]
      : dscList.sort((a, _) => (a.country == dcc.data.payload.iss ? -1 : 1))
    for (const cert of certList) {
      const chunkedData = chunkSubstr(cert.rawData, 64).join('\n')
      const certBuff = Buffer.from(
        `-----BEGIN CERTIFICATE-----\n${chunkedData}\n-----END CERTIFICATE-----`
      )
      const chunkedPubkey = chunkSubstr(
        Certificate.fromPEM(certBuff).publicKeyRaw.toString('base64'),
        64
      ).join('\n')
      const pubkeyBuff = Buffer.from(
        `-----BEGIN PUBLIC KEY-----\n${chunkedPubkey}\n-----END PUBLIC KEY-----`
      )
      const publicKey = PublicKey.fromPEM(pubkeyBuff).keyRaw
      const keyX = publicKey.slice(1, 1 + 32)
      const keyY = publicKey.slice(33, 33 + 32)
      try {
        // eslint-disable-next-line no-await-in-loop
        await cose.sign.verify(dcc.decompressedRaw, {
          key: { x: keyX, y: keyY },
        })
        return true
        // eslint-disable-next-line no-empty
      } catch {}
    }

    return false
  }
}
