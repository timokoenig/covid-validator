import { parseDCC, verifyDCC } from './dcc'

export default async function validateCertificate(data: string): Promise<any> {
  let dcc = parseDCC(data)
  if (!dcc) {
    return undefined
  }
  console.log(dcc)
  console.log(await verifyDCC(dcc))

  return undefined
}
