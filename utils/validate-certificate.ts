import { decodeOnly, DCCData, VerificationResult } from 'dcc-decoder'
import dccConfig from './dccConfig'

export default async function validateCertificate(data: string): Promise<VerificationResult> {
  const dccData = {
    signingKeys: dccConfig.certs,
    valueSets: dccConfig.valueSets,
  } as DCCData

  const result = await decodeOnly({
    source: [data],
    dccData: dccData,
  })
  // if (result.error) {
  //   console.log('Decoding error', result.error)
  //   return
  // }
  // if (result.ruleErrors) {
  //   console.log('Rule errors', result.ruleErrors)
  //   return
  // }

  return result
}
