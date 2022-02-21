/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { evaluate } from 'certlogic-js'
import moment from 'moment'
import { TFunction } from 'react-i18next'
import { app } from '../state/app'
import { builder } from '../state/builder'
import builderStateRulesDE from './builder-state-rules-de.json'
import { encode } from './builder/classes'
import countries from './countries'
import { DCC } from './dcc'
import countryBusinessRules from './eu-dcc-rules.json'
import { Country, State } from './models'

/**
 * Rules type
 */
export type Rules = {
  updatedAt: string
  rules: Rule[]
}

/**
 * CustomRule type
 */
export type CustomRule = {
  id: string
  name: string
  description: string
  immunizationRules: ImmunizationRule[]
  rules: Rule[]
}

/**
 * ImmunizationRule type
 */
export type ImmunizationRule = {
  id: string
  medicalProducts: string[]
  rule: any
  type: string
}

/**
 * Language type
 */
export type Language = {
  lang: string
  desc: string
}

/**
 * Rule type
 */
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

/**
 * DCCRuleValidationResult type
 */
export type DCCRuleValidationResult = {
  results: ValidationResult[]
  isValid: boolean
}

/**
 * ValidationResult type
 */
export type ValidationResult = {
  rule: Rule
  valid: boolean
}

/**
 * ExternalParameters type
 */
export type ExternalParameters = {
  valueSets: any
  validationClock: string
}

/**
 * Parameters type
 */
export type Parameters = {
  payload: any
  external: ExternalParameters
}

/**
 * Get Code and Name for given country and state
 *
 * @param t - TFunction to translate country names
 * @param country - Country code
 * @param state - State code
 * @returns Country and State
 */
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

/**
 * Check if country and state combination is a custom rule.
 * Custom user rules are any countries with length > 2
 * Custom German state rules are any state that is not empty
 *
 * @param country - Country code
 * @param state - State code
 * @returns boolean
 */
export function customRulesSelected(country: string, state: string): boolean {
  return country.length > 2 || state !== ''
}

/**
 * Return acceptance rules based on users country and state selection
 *
 * @returns Array of rules
 */
export function currentAcceptanceRules(): Rule[] {
  const appState = app.get()
  return acceptanceRules(appState.country, appState.state)
}
/**
 * Return acceptance rules based on country and state
 *
 * @param country - Country code
 * @param state - State code
 * @returns Array of rules
 */
export function acceptanceRules(country: string, state: string): Rule[] {
  // Temporary solution for German state rules
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

/**
 * Validate DCC with Rule
 *
 * @param rule - Acceptance Rule
 * @param parameters - DCC payload and external parameters
 * @returns Validation result
 */
export function validateDCCRule(rule: Rule, parameters: Parameters): ValidationResult {
  const res = evaluate(rule.Logic, parameters)
  return {
    rule,
    valid: res === true,
  }
}

/**
 * Validate DCC with all rules for country and state
 *
 * @param dcc - Users DCC
 * @param country - Country code
 * @param state - State code
 * @param validationClock - Date when the rule should be checked
 * @returns Validation result
 */
export function validateDCCRules(
  dcc: DCC,
  country: string,
  state: string,
  validationClock: Date
): DCCRuleValidationResult {
  const rules = acceptanceRules(country, state)

  // Custom or State Rules: certificate is valid if one rule is valid
  if (customRulesSelected(country, state)) {
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

/**
 * Export rules from CustomRule that can be used with the certlogic
 *
 * @param customRule - CustomRule
 * @param excludeCustomProperties - True, if you use these rules with certlogic
 * @returns Array of rules
 */
export function exportRules(
  customRule: CustomRule,
  excludeCustomProperties: boolean = false
): Rule[] {
  return customRule.rules.map(rule => {
    return exportRule(rule, customRule.immunizationRules, excludeCustomProperties)
  })
}

/**
 * Dynamically combine immunization rules with certificate rule and export so it can be used with certlogic
 *
 * @param rule - Rule
 * @param immunizationRules - Array of ImmunizationRules
 * @param excludeCustomProperties - True, if you use these rules with certlogic
 * @returns The combined Rule
 */
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
