import base45 from 'base45'
import zlib from 'pako'
import cbor from 'cbor'
import { Certificate, PublicKey } from '@fidm/x509'
import cose from 'cose-js'

const dscList = require('./dsc.json') as {
  certificates: {
    kid: string
    rawData: string
  }[]
}

export type DCCHeader = {
  kid: string | null
}

export type DCCData = {
  header: DCCHeader
  payload: any
  signature: string
}

export type DCC = {
  raw: string
  decompressedRaw: Uint8Array
  data: DCCData
}

export function parseDCC(data: string): DCC | null {
  if (!data.startsWith('HC1:')) return null
  const certData = data.replace('HC1:', '')
  const decodedData = base45.decode(certData)
  const decompressedData = zlib.inflate(decodedData)
  const coseResult = cbor.decodeAllSync(decompressedData)
  if (coseResult.length == 0) return null
  const [protected_header, unprotected_header, payload, signature] = coseResult[0].value
  return {
    raw: data,
    decompressedRaw: decompressedData,
    data: {
      header: {
        kid: parseKid(cbor.decodeAllSync(protected_header), unprotected_header),
      },
      payload: cbor.decodeAllSync(payload),
      signature: signature,
    },
  }
}

export async function verifyDCC(dcc: DCC): Promise<boolean> {
  const keyByKid = dscList.certificates.find(cert => cert.kid == dcc.data.header.kid)
  const certList = keyByKid ? [keyByKid] : dscList.certificates
  for (let cert of certList) {
    const certBuff = Buffer.from(
      '-----BEGIN CERTIFICATE-----\n' +
        chunkSubstr(cert.rawData, 64).join('\n') +
        '\n-----END CERTIFICATE-----'
    )
    const pubkeyBuff = Buffer.from(
      '-----BEGIN PUBLIC KEY-----\n' +
        chunkSubstr(Certificate.fromPEM(certBuff).publicKeyRaw.toString('base64'), 64).join('\n') +
        '\n-----END PUBLIC KEY-----'
    )
    const publicKey = PublicKey.fromPEM(pubkeyBuff).keyRaw
    const keyX = publicKey.slice(1, 1 + 32)
    const keyY = publicKey.slice(33, 33 + 32)
    try {
      await cose.sign.verify(dcc.decompressedRaw, {
        key: { x: keyX, y: keyY },
      })
      return true
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
  return btoa(kid.reduce((str: any, v: any) => str + String.fromCharCode(v), ''))
}

function chunkSubstr(str: string, size: number): string[] {
  const numChunks = Math.ceil(str.length / size)
  const chunks = new Array(numChunks)
  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size)
  }
  return chunks
}
