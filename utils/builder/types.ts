/* eslint-disable @typescript-eslint/no-empty-interface */
export type Value = string | number | boolean

export type JSONValue = string | number | boolean | JSONObject | JSONArray | null

export interface JSONObject {
  [x: string]: JSONValue
}

/**
 * JSONArray is an array of JSONValues
 */
export interface JSONArray extends Array<JSONValue> {}

/**
 * BType interface as base of all builder type components
 */
export interface BType {
  /**
   * Encode JSONValue to BType
   *
   * @param data - JSONValue
   * @returns BType
   */
  encode(data: JSONValue): BType

  /**
   * Decode object to JSONValue
   *
   * @param immunizationRules - (optional) JSONArray of immunization rules that will be used in custom ImmunizationType component
   * @param excludeCustomProperties - (optional) True if JSONValue should not include the custom component type properties. NOTE: certlogic does not support custom paremters
   * @returns JSONValue
   */
  decode(immunizationRules?: JSONArray, excludeCustomProperties?: boolean): JSONValue
}

/**
 * BTypeEmpty is a placeholder for other BTypes
 */
export interface BTypeEmpty extends BType {}

/**
 * BTypeIf is a IF-Condition
 */
export interface BTypeIf extends BType {
  condition: BType
  conditionTrue: BType
  conditionFalse: BType
}

/**
 * BTypeValue is a plain value (string | number | boolean)
 */
export interface BTypeValue extends BType {
  value: Value
}

/**
 * BTypeVar is a variable that will be dynamically fetched from the certificate, e.g. payload.v.0.dn
 */
export interface BTypeVar extends BTypeValue {}

export const DURATION_HOURS = 'hour'
export const DURATION_DAYS = 'day'

/**
 * BTypeDate is a date component to turn a variable into a date
 */
export interface BTypeDate extends BType {
  value: BTypeVar
  number: number
  duration: string
}

export const OPERATOR_EQUALS = '==='
export const OPERATOR_GREATER = '>'
export const OPERATOR_GREATER_EQUALS = '>='

/**
 * BTypeCompare is a compare operation between two BTypes
 */
export interface BTypeCompare extends BType {
  variableA: BType
  variableB: BType
  operator: string
}

export const OPERATOR_DATE_NOT_BEFORE = 'not-before'
export const OPERATOR_DATE_NOT_AFTER = 'not-after'

/**
 * BTypeCompareDate is a compare operation between two dates
 */
export interface BTypeCompareDate extends BTypeCompare {}

/**
 * BTypeIn is a compare operation that checks if given variable is part of the values array
 */
export interface BTypeCompareIn extends BType {
  variable: BType
  values: string[]
}

/**
 * BTypeAnd is a AND operation where all BTypes need to be true
 */
export interface BTypeAnd extends BType {
  conditions: BType[]
}

export const CERTIFICATE_TYPE_VACCINATION = 'Vaccination'
export const CERTIFICATE_TYPE_TEST = 'Test'
export const CERTIFICATE_TYPE_RECOVERY = 'Recovery'
export const CERTIFICATE_TYPE_ALL = [
  CERTIFICATE_TYPE_VACCINATION,
  CERTIFICATE_TYPE_TEST,
  CERTIFICATE_TYPE_RECOVERY,
]

/**
 * BTypeCertificateType is a custom BType that simplifies the certificate type check
 */
export interface BTypeCertificateType extends BType {
  type: string
  conditionTrue: BType
}

export const IMMUNIZATION_STATUS_PARTIAL = 'partial'
export const IMMUNIZATION_STATUS_FULL = 'full'
export const IMMUNIZATION_STATUS_FULL_RECOVERY = 'full-recovery'
export const IMMUNIZATION_STATUS_BOOSTER = 'booster'
export const IMMUNIZATION_STATUS_ALL = [
  IMMUNIZATION_STATUS_PARTIAL,
  IMMUNIZATION_STATUS_FULL,
  IMMUNIZATION_STATUS_FULL_RECOVERY,
  IMMUNIZATION_STATUS_BOOSTER,
]

/**
 * BTypeImmunizationStatus is a custom BType that simplifies the immunization status check
 */
export interface BTypeImmunizationStatus extends BType {
  status: string
  vaccines: string[]
  conditionTrue: BType
}
