/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { evaluate } from 'certlogic-js'
import moment from 'moment'
import builderStateRulesDE from '../data/builder-state-rules-de.json'
import defaultRecoveryRulesGermany from '../data/default-recovery-rules-germany.json'
import countryBusinessRules from '../data/eu-dcc-rules.json'
import { app } from '../state/app'
import { builder } from '../state/builder'
import { DCC } from './dcc'
import { exportRules, getCertificateType } from './helper'

const valueSets: any = {
  'country-2-codes': require('../data/value-sets/country-2-codes.json').valueSetValues,
  'covid-19-lab-result': require('../data/value-sets/covid-19-lab-result.json').valueSetValues,
  'covid-19-lab-test-manufacturer-and-name':
    require('../data/value-sets/covid-19-lab-test-manufacturer-and-name.json').valueSetValues,
  'covid-19-lab-test-type': require('../data/value-sets/covid-19-lab-test-type.json')
    .valueSetValues,
  'disease-agent-targeted': require('../data/value-sets/disease-agent-targeted.json')
    .valueSetValues,
  'sct-vaccines-covid-19': require('../data/value-sets/sct-vaccines-covid-19.json').valueSetValues,
  'vaccines-covid-19-auth-holders':
    require('../data/value-sets/vaccines-covid-19-auth-holders.json').valueSetValues,
  'vaccines-covid-19-names': require('../data/value-sets/vaccines-covid-19-names.json')
    .valueSetValues,
}

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
 * RecoveryRule type
 */
export type RecoveryRule = {
  id: string
  rule: any
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
  exp: string | undefined
  iat: string | undefined
  issuerCountryCode: string
}

/**
 * Parameters type
 */
export type Parameters = {
  payload: any
  external: ExternalParameters
}

export interface ICertLogicConfig {
  country: () => string
  state: () => string
}

export class CertLogicConfig implements ICertLogicConfig {
  country(): string {
    return app.get().country
  }
  state(): string {
    return app.get().state
  }
}

export interface ICertLogic {
  /**
   * CertLogic config
   */
  config: ICertLogicConfig

  /**
   * Return acceptance rules based on users country and state selection
   *
   * @returns Array of rules
   */
  currentAcceptanceRules: () => Rule[]

  /**
   * Return acceptance rules based on country and state
   *
   * @param country - Country code
   * @param state - State code
   * @returns Array of rules
   */
  acceptanceRules: (country: string, state: string) => Rule[]

  /**
   * Validate DCC with all rules for country and state
   *
   * @param dcc - Users DCC
   * @param country - Country code
   * @param state - State code
   * @param validationClock - Date when the rule should be checked
   * @returns Validation result
   */
  validateDCC: (
    dcc: DCC,
    country: string,
    state: string,
    validationClock: Date
  ) => DCCRuleValidationResult

  /**
   * Validate DCC with all immunization rules to check what immunization status it has
   *
   * @param dcc - Users DCC
   * @param country - Country code
   * @param state - State code
   * @returns Immunization status or null if none matches
   */
  validateImmunizationRules: (dcc: DCC, country: string, state: string) => string | null

  /**
   * Validate DCC with all recovery rules to check whether it is considered a recovery or not
   *
   * @param dcc - Users DCC
   * @param country - Country code
   * @param state - State code
   * @returns True if dcc is considiered a recovery
   */
  validateRecoveryRules: (dcc: DCC, country: string, state: string) => boolean
}

/**
 * CertLogic class
 */
export class CertLogic implements ICertLogic {
  config: ICertLogicConfig

  constructor(config: ICertLogicConfig = new CertLogicConfig()) {
    this.config = config
  }

  currentAcceptanceRules(): Rule[] {
    return this.acceptanceRules(this.config.country(), this.config.state())
  }

  acceptanceRules(country: string, state: string): Rule[] {
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

  validateDCC(
    dcc: DCC,
    country: string,
    state: string,
    validationClock: Date
  ): DCCRuleValidationResult {
    const rules = this.acceptanceRules(country, state)

    // Custom or State Rules: certificate is valid if one rule is valid
    if (this.customRulesSelected(country, state)) {
      const results = rules.map(rule => {
        return this.validateDCCRule(rule, {
          payload: dcc.data.payload.hcert.dgc,
          external: {
            valueSets,
            validationClock: validationClock.toISOString(),
            exp: dcc.data.payload.exp,
            iat: dcc.data.payload.iat,
            issuerCountryCode: dcc.data.payload.iss,
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
      return this.validateDCCRule(rule, {
        payload: dcc.data.payload.hcert.dgc,
        external: {
          valueSets,
          validationClock: validationClock.toISOString(),
          exp: dcc.data.payload.exp,
          iat: dcc.data.payload.iat,
          issuerCountryCode: dcc.data.payload.iss,
        },
      })
    })
    const isValid = results.find(res => !res.valid) === undefined
    return {
      results,
      isValid,
    }
  }

  validateImmunizationRules(dcc: DCC, country: string, state: string): string | null {
    const rules = this.immunizationRules(country, state)
    for (const rule of rules) {
      const res = this.validateDCCRule(
        {
          Identifier: rule.id,
          Type: 'Acceptance',
          Country: 'DE',
          Version: '1.0.0',
          SchemaVersion: '1.0.0',
          Engine: 'CERTLOGIC',
          EngineVersion: '0.7.5',
          CertificateType: 'Vaccination',
          Description: [],
          ValidFrom: '2022-01-01T00:00:00Z',
          ValidTo: '2023-01-01T00:00:00Z',
          AffectedFields: [],
          Logic: {
            if: [{ var: 'payload.v.0' }, rule.rule, false],
          },
        },
        {
          payload: dcc.data.payload.hcert.dgc,
          external: {
            valueSets,
            validationClock: new Date().toISOString(),
            exp: dcc.data.payload.exp,
            iat: dcc.data.payload.iat,
            issuerCountryCode: dcc.data.payload.iss,
          },
        }
      )
      if (res.valid) {
        return rule.type
      }
    }
    return null
  }

  validateRecoveryRules(dcc: DCC, country: string, state: string): boolean {
    const rules = this.recoveryRules(country, state)
    for (const rule of rules) {
      const res = this.validateDCCRule(
        {
          Identifier: rule.id,
          Type: 'Acceptance',
          Country: 'DE',
          Version: '1.0.0',
          SchemaVersion: '1.0.0',
          Engine: 'CERTLOGIC',
          EngineVersion: '0.7.5',
          CertificateType: getCertificateType(dcc.data.payload.hcert.dgc),
          Description: [],
          ValidFrom: '2022-01-01T00:00:00Z',
          ValidTo: '2023-01-01T00:00:00Z',
          AffectedFields: [],
          Logic: rule.rule,
        },
        {
          payload: dcc.data.payload.hcert.dgc,
          external: {
            valueSets,
            validationClock: new Date().toISOString(),
            exp: dcc.data.payload.exp,
            iat: dcc.data.payload.iat,
            issuerCountryCode: dcc.data.payload.iss,
          },
        }
      )
      if (res.valid) {
        return true
      }
    }
    return false
  }

  private immunizationRules(country: string, state: string): ImmunizationRule[] {
    // Temporary solution for German state rules
    if (country.toUpperCase() === 'DE' && state !== '') {
      const customRule = builderStateRulesDE as CustomRule
      return customRule.immunizationRules
    }

    // Local custom rules
    if (country.length > 2 && state === '') {
      const customRule = builder.get().customRules.find(rule => rule.id === country)
      if (customRule === undefined) return []
      return customRule.immunizationRules
    }

    // At the moment we don't have any immunization rules for EU business rules
    // there all EU entry checks can only be used in 3G mode
    return []
  }

  private recoveryRules(country: string, state: string): RecoveryRule[] {
    // Temporary solution for German state rules
    if (country.toUpperCase() === 'DE' && state !== '') {
      return defaultRecoveryRulesGermany
    }

    return []
  }

  /**
   * Validate DCC with Rule
   *
   * @param rule - Acceptance Rule
   * @param parameters - DCC payload and external parameters
   * @returns Validation result
   */
  private validateDCCRule(rule: Rule, parameters: Parameters): ValidationResult {
    const res = evaluate(rule.Logic, parameters)
    return {
      rule,
      valid: res === true,
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
  private customRulesSelected(country: string, state: string): boolean {
    return country.length > 2 || state !== ''
  }
}
