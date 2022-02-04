import { DCC } from './dcc'
import countryBusinessRules from './eu-dcc-rules.json'

export type Rules = {
  updatedAt: string
  rules: Rule[]
}

export type Language = {
  lang: string
  desc: string
}

export type Rule = {
  Identifier: string
  Hash?: string | null
  Type: string
  Country: string
  Version: string
  SchemaVersion: string
  Engine: string
  EngineVersion: string
  CertificateType: string
  Description: Language[]
  ValidFrom: string
  ValidTo: string
  AffectedFields: string[]
  Logic: any
}

export type DCCRuleValidationResult = {
  rules: Rule[]
  failedRules: Rule[]
  valid: boolean
}

export async function validateDCCRules(
  dcc: DCC,
  country: string,
  validationClock: Date
): Promise<DCCRuleValidationResult> {
  const allRules = countryBusinessRules as Rules
  return {
    rules: [],
    failedRules: [],
    valid: false,
  }
}
