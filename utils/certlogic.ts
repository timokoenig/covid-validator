import { DCC } from './dcc'
import countryBusinessRules from './eu-dcc-rules.json'
import { evaluate } from 'certlogic-js'

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
  results: ValidationResult[]
  isValid: boolean
}

export type ValidationResult = {
  rule: Rule
  valid: boolean
}

export type ExternalParameters = {
  valueSets: any
  validationClock: string
}

export type Parameters = {
  payload: any
  external: ExternalParameters
}

export function validateDCCRule(rule: Rule, parameters: Parameters): ValidationResult {
  const res = evaluate(rule.Logic, parameters)
  return {
    rule: rule,
    valid: res === true,
  }
}

export function validateDCCRules(
  dcc: DCC,
  country: string,
  validationClock: Date
): DCCRuleValidationResult {
  const rules = countryBusinessRules as Rules
  const countryRules = rules.rules.filter(rule => rule.Country == country.toUpperCase())
  const results = countryRules.map(rule => {
    return validateDCCRule(rule, {
      payload: dcc.data.payload.hcert.dgc,
      external: {
        valueSets: [],
        validationClock: validationClock.toISOString(),
      },
    })
  })
  const isValid = results.find(res => !res.valid) === undefined
  return {
    results,
    isValid,
  }
}
