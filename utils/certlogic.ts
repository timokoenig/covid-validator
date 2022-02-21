/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { app } from '@/state/app'
import { builder } from '@/state/builder'
import { evaluate } from 'certlogic-js'
import moment from 'moment'
import { TFunction } from 'react-i18next'
import builderStateRulesDE from './builder-state-rules-de.json'
import { encode } from './builder/classes'
import countries from './countries'
import { DCC } from './dcc'
import countryBusinessRules from './eu-dcc-rules.json'
import { Country, State } from './models'

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

export function exportRules(
  customRule: CustomRule,
  excludeCustomProperties: boolean = false
): Rule[] {
  return customRule.rules.map(rule => {
    return exportRule(rule, customRule.immunizationRules, excludeCustomProperties)
  })
}

export function exportRule(
  rule: Rule,
  immunizationRules: ImmunizationRule[],
  excludeCustomProperties: boolean = false
): Rule {
  return {
    ...rule,
    Logic: encode(rule.Logic).decode(immunizationRules, excludeCustomProperties),
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

export function getCountryAndState(
  t: TFunction,
  country: string,
  state: string
): { country: Country; state: State } {
  if (country.length > 2) {
    const customRule = builder.get().customRules.find(rule => rule.id === country)
    return {
      country: {
        code: country,
        name: customRule?.name ?? 'n/a',
        states: [],
      },
      state: {
        code: '',
        name: '',
        updated: new Date(),
      },
    }
  }
  const allCountries = countries(t)
  const selectedCountry = allCountries.find(item => item.code == country) ?? allCountries[0]
  const selectedState =
    selectedCountry.states.find(item => item.code == state) ?? selectedCountry.states[0]
  return {
    country: selectedCountry,
    state: selectedState,
  }
}

export function customRulesSelected(country: string): boolean {
  return country.length > 2
}

export function currentAcceptanceRules(): Rule[] {
  const appState = app.get()
  return acceptanceRules(appState.country, appState.state)
}

export function acceptanceRules(country: string, state: string): Rule[] {
  // TODO temporary solution for German state rules
  if (country.toUpperCase() === 'DE' && state !== '') {
    const customRule = builderStateRulesDE as CustomRule
    return exportRules(customRule, true)
  }

  // Local custom rules
  if (country.length > 2 && state === '') {
    const customRule = builder.get().customRules.find(rule => rule.id === country)
    if (customRule === undefined) return []
    return exportRules(customRule, true)
  }

  // EU business rules
  const rules = countryBusinessRules as Rules
  return (
    rules.rules
      .filter(rule => rule.Country == country.toUpperCase())
      // Currently we only use Acceptance rules due to the fact that there are not Invalidation rules yet
      .filter(rule => rule.Type == 'Acceptance')
      // Only use rules that are active
      .filter(rule => moment() >= moment(rule.ValidFrom) && moment() < moment(rule.ValidTo))
  )
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
  const rules = acceptanceRules(country, state)

  // Custom or State Rules: certificate is valid if one rule is valid
  if (customRulesSelected(country)) {
    const results = rules.map(rule => {
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

  // EU Rules: certificate is valid if one rule is invalid
  const results = rules.map(rule => {
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
