/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import base45 from 'base45'
import zlib from 'pako'
import cbor from 'cbor'
import { Certificate, PublicKey } from '@fidm/x509'
import cose from 'cose-js'
import { ExtendedResults } from 'cbor/types/lib/decoder'
import { DCCRuleValidationResult, validateDCCRules } from './certlogic'
import dscListJson from './dsc.json'

const dscList = dscListJson as {
  certificates: {
    kid: string
    rawData: string
  }[]
}

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

type Name = {
  gn?: string
  fn?: string
  gnt?: string
  fnt: string
}

type DigitalGreenCertificate = {
  nam: Name
  dob?: string
  v?: Vaccination[]
  t?: Test[]
  r?: Recovery[]
  ver: string
}

type HealthCertificateClaim = {
  dgc: DigitalGreenCertificate
}

export type CBORWebToken = {
  iss: string
  iat?: string
  exp?: string
  hcert: HealthCertificateClaim
}

export type DCCHeader = {
  kid: string | null
}

export type DCCData = {
  header: DCCHeader
  payload: CBORWebToken
  signature: string
}

export type DCC = {
  raw: string
  decompressedRaw: Uint8Array
  data: DCCData
}

export type CertificateResult = {
  dcc: DCC
  verification: boolean
  ruleValidation?: DCCRuleValidationResult
}

export type ScanResult = {
  certificates: CertificateResult[]
  isMultiScan: boolean
}

class DCCParseError extends Error {}

// parse, verify and validate rules
export async function checkCertificate(data: string): Promise<ScanResult> {
  // parse dcc
  const dcc = await parseDCC(data)
  // verify dcc
  const verified = await verifyDCC(dcc)
  if (!verified) {
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
  const ruleResult = validateDCCRules(dcc, localStorage.getItem('country') ?? 'DE', new Date())
  return {
    certificates: [
      {
        dcc,
        verification: true,
        ruleValidation: ruleResult,
      },
    ],
    isMultiScan: ruleResult.isValid ? isMultiScan(dcc) : false,
  }
}

function isMultiScan(dcc: DCC): boolean {
  const purpose = localStorage.getItem('purpose') ?? ''
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

function parseKid(protectedHeader: any, unprotectedHeader: any): string | null {
  let kid = protectedHeader[0].get(4)
  if (!kid) {
    kid = unprotectedHeader.get(4)
  }
  if (!kid) return null
  return btoa(kid.reduce((str: any, v: any) => `${str}${String.fromCharCode(v)}`, ''))
}

function chunkSubstr(str: string, size: number): string[] {
  const numChunks = Math.ceil(str.length / size)
  const chunks = new Array(numChunks)
  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size)
  }
  return chunks
}
