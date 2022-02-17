/* eslint-disable @typescript-eslint/no-empty-interface */
type JSONValue = string | number | boolean | JSONObject | JSONArray

interface JSONObject {
  [x: string]: JSONValue
}

interface JSONArray extends Array<JSONValue> {}

export interface BType {
  jsonLogic(): JSONObject
}

export interface BTypeIf extends BType {
  condition: BType
  true: BType
  false: BType
}

export interface BTypeVar extends BType {
  variable: string
}

export const DURATION_HOURS = 'hours'
export const DURATION_DAYS = 'days'

export interface BTypeDate extends BTypeVar {
  number: number
  duration: string
}

export const OPERATOR_EQUALS = '==='
export const OPERATOR_GREATER = '>'
export const OPERATOR_GREATER_EQUALS = '>='

export interface BTypeCompare extends BType {
  varA: BTypeVar
  varB: BTypeVar
  operator: string
}

export const OPERATOR_DATE_BEFORE = 'date-before'
export const OPERATOR_DATE_AFTER = 'date-after'

export interface BTypeCompareDate extends BTypeCompare {}

export interface BTypeAnd extends BType {
  conditions: BType[]
}

export interface BTypeOr extends BType {
  conditions: BType[]
}

export const IMMUNIZATION_STATUS_PARTIAL = 'partial'
export const IMMUNIZATION_STATUS_FULL = 'full'
export const IMMUNIZATION_STATUS_FULL_RECOVERY = 'full-recovery'
export const IMMUNIZATION_STATUS_BOOSTER = 'booster'

export interface BTypeImmunizationStatus extends BType {
  status: string
}
