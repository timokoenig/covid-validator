import base45 from 'base45'
import zlib from 'pako'
import { CustomRule } from './certlogic'

function customRuleExport(customRule: CustomRule): string {
  const compressedData = zlib.deflate(JSON.stringify(customRule))
  const encodedData = base45.encode(compressedData)
  return `CR:${encodedData}`
}

export default customRuleExport
