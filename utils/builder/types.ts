/* eslint-disable @typescript-eslint/no-empty-interface */
export type Value = string | number | boolean

export type JSONValue = string | number | boolean | JSONObject | JSONArray | null

export interface JSONObject {
  [x: string]: JSONValue
}

export interface JSONArray extends Array<JSONValue> {}

export interface BType {
  // readonly type: string
  encode(data: JSONValue): BType
  decode(): JSONValue
}

export interface BTypeEmpty extends BType {}

export interface BTypeIf extends BType {
  condition: BType
  conditionTrue: BType
  conditionFalse: BType
}

export interface BTypeValue extends BType {
  value: Value
}

export interface BTypeVar extends BTypeValue {}

export const DURATION_HOURS = 'hour'
export const DURATION_DAYS = 'day'

export interface BTypeDate extends BType {
  value: BTypeVar
  number: number
  duration: string
}

export const OPERATOR_EQUALS = '==='
export const OPERATOR_GREATER = '>'
export const OPERATOR_GREATER_EQUALS = '>='

export interface BTypeCompare extends BType {
  variableA: BTypeValue
  variableB: BTypeValue
  operator: string
}

export const OPERATOR_DATE_BEFORE = 'date-before'
export const OPERATOR_DATE_AFTER = 'date-after'

export interface BTypeCompareDate extends BTypeCompare {}

export interface BTypeCompareIn extends BType {
  variable: BTypeVar
  values: string[]
}

export interface BTypeAnd extends BType {
  conditions: BType[]
}

// export interface BTypeOr extends BType {
//   conditions: BType[]
// }

// export const IMMUNIZATION_STATUS_PARTIAL = 'partial'
// export const IMMUNIZATION_STATUS_FULL = 'full'
// export const IMMUNIZATION_STATUS_FULL_RECOVERY = 'full-recovery'
// export const IMMUNIZATION_STATUS_BOOSTER = 'booster'

// export interface BTypeImmunizationStatus extends BType {
//   status: string
// }

export const CERTIFICATE_TYPE_VACCINATION = 'Vaccination'
export const CERTIFICATE_TYPE_TEST = 'Test'
export const CERTIFICATE_TYPE_RECOVERY = 'Recovery'

export interface BTypeCertificateType extends BType {
  type: string
  conditionTrue: BType
}
