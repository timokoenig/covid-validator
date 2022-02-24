/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TFunction } from 'react-i18next'
import { builder } from '../state/builder'
import { encode } from './builder/classes'
import {
  CERTIFICATE_TYPE_RECOVERY,
  CERTIFICATE_TYPE_TEST,
  CERTIFICATE_TYPE_VACCINATION,
} from './builder/types'
import { CustomRule, ImmunizationRule, Rule } from './certlogic'
import countries from './countries'
import { DigitalGreenCertificate, Name } from './dcc'
import { Country, State } from './models'

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
 * Chunk string with given size
 *
 * @param str - string that should be chunked
 * @param size - number of characters in chunk
 * @returns Array of chunks
 */
export function chunkSubstr(str: string, size: number): string[] {
  const numChunks = Math.ceil(str.length / size)
  const chunks = new Array(numChunks)
  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size)
  }
  return chunks
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

export function getCertificateType(dgc: DigitalGreenCertificate): string {
  if ((dgc.t?.length ?? 0) > 0) {
    return CERTIFICATE_TYPE_TEST
  }
  if ((dgc.r?.length ?? 0) > 0) {
    return CERTIFICATE_TYPE_RECOVERY
  }
  return CERTIFICATE_TYPE_VACCINATION
}

/**
 * Get dislpayed name
 */
export function dislpayName(name: Name) {
  if (name.gn !== undefined && name.fn !== undefined) {
    return `${name.gn} ${name.fn}`
  }
  if (name.gnt !== undefined) {
    return `${name.gnt} ${name.fnt}`
  }
  return name.fnt
}
