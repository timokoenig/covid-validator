/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { evaluate } from 'certlogic-js'
import moment from 'moment'
import { DCC } from './dcc'
import countryBusinessRules from './eu-dcc-rules.json'

export type Rules = {
  updatedAt: string
  rules: Rule[]
}

export type CustomRule = {
  id: string
  name: string
  description: string
  immunizationRules: ImmunizationRule[]
  rules: Rule[]
}

export const IMMUNIZATION_TYPE_PARTIAL = 'partial'
export const IMMUNIZATION_TYPE_FULL = 'full'
export const IMMUNIZATION_TYPE_FULL_RECOVERY = 'full-recovery'
export const IMMUNIZATION_TYPE_BOOSTER = 'booster'

export function immunizationTypeName(type: string): string {
  switch (type) {
    case IMMUNIZATION_TYPE_PARTIAL:
      return 'Partial Immunization'
    case IMMUNIZATION_TYPE_FULL:
      return 'Full Immunization'
    case IMMUNIZATION_TYPE_FULL_RECOVERY:
      return 'Full Immunization after Recovery'
    case IMMUNIZATION_TYPE_BOOSTER:
      return 'Booster Immunization'
    default:
      return ''
  }
}

export type ImmunizationRule = {
  id: string
  medicalProducts: string[]
  rule: any
  type: string
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
    rule,
    valid: res === true,
  }
}

export function validateDCCRules(
  dcc: DCC,
  country: string,
  validationClock: Date
): DCCRuleValidationResult {
  const rules = countryBusinessRules as Rules
  const countryRules = rules.rules
    .filter(rule => rule.Country == country.toUpperCase())
    // Currently we only use Acceptance rules due to the fact that there are not Invalidation rules yet
    .filter(rule => rule.Type == 'Acceptance')
    // Only use rules that are active
    .filter(rule => moment() >= moment(rule.ValidFrom) && moment() < moment(rule.ValidTo))
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
