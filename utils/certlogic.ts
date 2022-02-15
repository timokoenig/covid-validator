/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { evaluate } from 'certlogic-js'
import moment from 'moment'
import builderStateRulesDE from './builder-state-rules-de.json'
import { encodeCertificateRule } from './certificate-rule'
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
  rules: CertificateRule[]
}

export type CertificateRule = {
  id: string
  type: string
  medicalProducts?: string[]
  immunizationStatus?: string
  validFrom?: number
  validTo?: number
  translations: Language[]
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
  state: string,
  validationClock: Date
): DCCRuleValidationResult {
  // TODO this is a temporary workaround to handle custom rule validation
  if (country.toUpperCase() == 'DE' && state !== '') {
    // At this point all states are similar thats why we have only one set of rules for it
    const customRule = builderStateRulesDE.customRules.find(
      rule => rule.id === 'de45d285-c750-4537-bb09-79910079a559'
    )!
    const rules = customRule.rules.map(rule => encodeCertificateRule(customRule, rule))
    const results = rules.map(rule => {
      if (rule === null) return { valid: false }
      return validateDCCRule(rule, {
        payload: dcc.data.payload.hcert.dgc,
        external: {
          valueSets: [],
          validationClock: validationClock.toISOString(),
        },
      })
    })
    const validRule = results.find(res => res.valid)
    return {
      results: [validRule as ValidationResult],
      isValid: validRule !== undefined,
    }
  }
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
