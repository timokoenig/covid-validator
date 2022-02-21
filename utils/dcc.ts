/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Certificate, PublicKey } from '@fidm/x509'
import base45 from 'base45'
import cbor from 'cbor'
import { ExtendedResults } from 'cbor/types/lib/decoder'
import cose from 'cose-js'
import moment from 'moment'
import zlib from 'pako'
import { app } from '../state/app'
import { DCCRuleValidationResult, validateDCCRules } from './certlogic'
import dscListJson from './dsc.json'

const dscList = dscListJson as {
  certificates: {
    kid: string
    rawData: string
  }[]
}

/**
 * Vaccination type
 */
type Vaccination = {
  // Disease or agent targeted
  tg: string
  // Vaccine or prophylaxis
  vp: string
  // Vaccine medicinal product
  mp: string
  // Marketing Authorization Holder - if no MAH present, then manufacturer
  ma: string
  // Dose Number (1-9)
  dn: number
  // Total Series of Doses
  sd: number
  // Date of Vaccination
  dt: string
  // Country of Vaccination
  co: string
  // Certificate Issuer
  is: string
  // Unique Certificate Identifier: UVCI
  ci: string
}

/**
 * Test type
 */
type Test = {
  // Disease or agent targeted
  tg: string
  // Type of Test
  tt: string
  // Test name (optional for NAAT test)
  nm?: string
  // Test manufacturer (optional for NAAT test)
  ma?: string
  // Date/Time of Sample Collection
  sc: string
  // Test Result
  tr: string
  // Testing Centre
  tc?: string
  // Country of Vaccination
  co: string
  // Certificate Issuer
  is: string
  // Unique Certificate Identifier: UVCI
  ci: string
}

/**
 * Recovery type
 */
type Recovery = {
  // Disease or agent targeted
  tg: string
  // Date of First Positive Test Result
  fr: string
  // Date: Certificate Valid From
  df: string
  // Date: Certificate Valid Until
  du: string
  // Country of Vaccination
  co: string
  // Certificate Issuer
  is: string
  // Unique Certificate Identifier: UVCI
  ci: string
}

/**
 * Name type
 */
type Name = {
  gn?: string
  fn?: string
  gnt?: string
  fnt: string
}

/**
 * DigitalGreenCertificate type
 */
export type DigitalGreenCertificate = {
  nam: Name
  dob?: string
  v?: Vaccination[]
  t?: Test[]
  r?: Recovery[]
  ver: string
}

/**
 * HealthCertificateClaim type
 */
type HealthCertificateClaim = {
  dgc: DigitalGreenCertificate
}

/**
 * CBORWebToken type
 */
export type CBORWebToken = {
  iss: string
  iat?: string
  exp?: string
  hcert: HealthCertificateClaim
}

/**
 * DCCHeader type
 */
export type DCCHeader = {
  kid: string | null
}

/**
 * DCCData type
 */
export type DCCData = {
  header: DCCHeader
  payload: CBORWebToken
  signature: string
}

/**
 * DCC type
 */
export type DCC = {
  raw: string
  decompressedRaw: Uint8Array
  data: DCCData
}

/**
 * CertificateResult type
 */
export type CertificateResult = {
  dcc: DCC
  verification: boolean
  ruleValidation?: DCCRuleValidationResult
}

/**
 * ScanResult type
 */
export type ScanResult = {
  certificates: CertificateResult[]
  isMultiScan: boolean
}

/**
 * DCCParseError
 */
class DCCParseError extends Error {}

/**
 * Parse, verify, and validate DCC against selected rules
 *
 * @param data - Scanned QR code data
 * @returns ScanResult
 */
export async function checkCertificate(data: string): Promise<ScanResult> {
  // parse dcc
  const dcc = await parseDCC(data)
  // verify dcc
  const verified = await verifyDCC(dcc)
  const isExpired = dcc.data.payload.exp ? moment() > moment(dcc.data.payload.exp) : false
  if (!verified || isExpired) {
    // verification failed
    return {
      certificates: [
        {
          dcc,
          verification: false,
        },
      ],
      isMultiScan: false,
    }
  }
  // check dcc is multiscan is required
  // validate dcc against selected rules
  const ruleResult = validateDCCRules(dcc, app.get().country, app.get().state, new Date())
  return {
    certificates: [
      {
        dcc,
        verification: true,
        ruleValidation: ruleResult,
      },
    ],
    isMultiScan: ruleResult.isValid
      ? isMultiScan(dcc, app.get().country, app.get().purpose)
      : false,
  }
}

/**
 * Check if multiscan is required for given DCC.
 * In case of a + Purpose, like 2G+ in Germany, the user has to scan a test certificate if only a full immunization is given.
 *
 * @param dcc - Users DCC
 * @param country - Country code
 * @param state - State code
 * @returns True, if multiscan is required
 */
function isMultiScan(dcc: DCC, country: string, purpose: string): boolean {
  // At the moment the multiscan is only available in Germany. Need to check if this is a thing in other countries as well
  if (country !== 'DE') return false

  if (!purpose.includes('+')) return false
  // current purpose required additional test, except for valid booster certificates
  const vac = dcc.data.payload.hcert.dgc.v
  if (vac == undefined || vac.length == 0) {
    // TODO throw error
    return false
  }
  const isBooster = vac[0].dn >= 3 || vac[0].dn > vac[0].sd
  return !isBooster
}

/**
 * Parse DCC from QR code data
 *
 * @param data - QR code data
 * @returns DCC
 */
export async function parseDCC(data: string): Promise<DCC> {
  if (!data.startsWith('HC1:')) throw DCCParseError
  const certData = data.replace('HC1:', '')
  const decodedData = base45.decode(certData)
  const decompressedData = zlib.inflate(decodedData)
  const coseResult = cbor.decodeAllSync(decompressedData)
  if (coseResult.length == 0) throw DCCParseError
  const [protected_header, unprotected_header, payload, signature] = coseResult[0].value
  return {
    raw: data,
    decompressedRaw: decompressedData,
    data: {
      header: {
        kid: parseKid(cbor.decodeAllSync(protected_header), unprotected_header),
      },
      payload: parsePayload(cbor.decodeAllSync(payload)),
      signature,
    },
  }
}

/**
 * Parse CBOR payload into CBORWebToken
 *
 * @param payload - Decoded CBOR payload
 * @returns CBORWebToken
 */
function parsePayload(payload: any[] | ExtendedResults[]): CBORWebToken {
  return {
    iss: payload[0].get(1) as string,
    iat: (payload[0].get(6) as number).toFixed(0),
    exp: (payload[0].get(4) as number).toFixed(0),
    hcert: {
      dgc: payload[0].get(-260).get(1),
    },
  }
}

/**
 * Verify DCC with digital signing certificates (DSCs)
 *
 * @param dcc - Users DCC
 * @returns True, if DCC is signed with a valid key
 */
export async function verifyDCC(dcc: DCC): Promise<boolean> {
  const keyByKid = dscList.certificates.find(cert => cert.kid == dcc.data.header.kid)
  const certList = keyByKid ? [keyByKid] : dscList.certificates
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

/**
 * Parse kid from CBOR header
 *
 * @param protectedHeader - any
 * @param unprotectedHeader - any
 * @returns kid string
 */
function parseKid(protectedHeader: any, unprotectedHeader: any): string | null {
  let kid = protectedHeader[0].get(4)
  if (!kid) {
    kid = unprotectedHeader.get(4)
  }
  if (!kid) return null
  return btoa(kid.reduce((str: any, v: any) => `${str}${String.fromCharCode(v)}`, ''))
}

/**
 * Chunk string with given size
 *
 * @param str - string that should be chunked
 * @param size - number of characters in chunk
 * @returns Array of chunks
 */
function chunkSubstr(str: string, size: number): string[] {
  const numChunks = Math.ceil(str.length / size)
  const chunks = new Array(numChunks)
  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size)
  }
  return chunks
}
