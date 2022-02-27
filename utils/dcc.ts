/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import base45 from 'base45'
import cbor from 'cbor'
import { ExtendedResults } from 'cbor/types/lib/decoder'
import zlib from 'pako'

/**
 * Vaccination type
 */
export type Vaccination = {
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
export type Test = {
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
export type Recovery = {
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
export type Name = {
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
 * DCCParseError
 */
export class DCCParseError extends Error {
  name: string = 'DCCParseError'
}

/**
 * Parse DCC from QR code data
 *
 * @param data - QR code data
 */
export class DCC {
  raw: string
  decompressedRaw: Uint8Array
  data: DCCData

  constructor(data: string) {
    if (!data.startsWith('HC1:')) throw DCCParseError
    const certData = data.replace('HC1:', '')
    const decodedData = base45.decode(certData)
    const decompressedData = zlib.inflate(decodedData)
    const coseResult = cbor.decodeAllSync(decompressedData)
    if (coseResult.length == 0) throw DCCParseError
    const [protected_header, unprotected_header, payload, signature] = coseResult[0].value
    this.raw = data
    this.decompressedRaw = decompressedData
    this.data = {
      header: {
        kid: this.parseKid(cbor.decodeAllSync(protected_header), unprotected_header),
      },
      payload: this.parsePayload(cbor.decodeAllSync(payload)),
      signature,
    }
  }

  /**
   * Parse CBOR payload into CBORWebToken
   *
   * @param payload - Decoded CBOR payload
   * @returns CBORWebToken
   */
  private parsePayload(payload: any[] | ExtendedResults[]): CBORWebToken {
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
   * Parse kid from CBOR header
   *
   * @param protectedHeader - any
   * @param unprotectedHeader - any
   * @returns kid string
   */
  private parseKid(protectedHeader: any, unprotectedHeader: any): string | null {
    let kid = protectedHeader[0].get(4)
    if (!kid) {
      kid = unprotectedHeader.get(4)
    }
    if (!kid) return null
    return Buffer.from(
      (kid.reduce((str: any, v: any) => `${str}${String.fromCharCode(v)}`, ''), 'binary')
    ).toString()
  }
}
