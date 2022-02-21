/* eslint-disable complexity */
import {
  BType,
  BTypeAnd,
  BTypeCertificateType,
  BTypeCompare,
  BTypeCompareDate,
  BTypeCompareIn,
  BTypeDate,
  BTypeIf,
  BTypeImmunizationStatus,
  BTypeValue,
  BTypeVar,
  CERTIFICATE_TYPE_RECOVERY,
  CERTIFICATE_TYPE_TEST,
  CERTIFICATE_TYPE_VACCINATION,
  DURATION_DAYS,
  DURATION_HOURS,
  IMMUNIZATION_STATUS_FULL,
  JSONArray,
  JSONObject,
  JSONValue,
  OPERATOR_DATE_NOT_AFTER,
  OPERATOR_DATE_NOT_BEFORE,
  OPERATOR_EQUALS,
  OPERATOR_GREATER,
  OPERATOR_GREATER_EQUALS,
  Value,
} from './types'

export class BClassEmpty implements BType {
  encode(_: JSONValue): BType {
    return new BClassEmpty()
  }

  decode(): JSONValue {
    return {}
  }
}

export class BClassIf implements BTypeIf {
  condition: BType = new BClassEmpty()
  conditionTrue: BType = new BClassEmpty()
  conditionFalse: BType = new BClassEmpty()

  constructor(
    condition: BType = new BClassEmpty(),
    conditionTrue: BType = new BClassEmpty(),
    conditionFalse: BType = new BClassEmpty()
  ) {
    this.condition = condition
    this.conditionTrue = conditionTrue
    this.conditionFalse = conditionFalse
  }

  encode(data: JSONValue): BType {
    const obj = data as JSONObject
    const arr = obj.if as JSONArray
    return new BClassIf(encode(arr[0]), encode(arr[1]), encode(arr[2]))
  }

  decode(immunizationRules?: JSONArray, excludeCustomProperties?: boolean): JSONValue {
    return {
      if: [
        this.condition.decode(immunizationRules, excludeCustomProperties),
        this.conditionTrue.decode(immunizationRules, excludeCustomProperties),
        this.conditionFalse.decode(immunizationRules, excludeCustomProperties),
      ],
    }
  }
}

export class BClassValue implements BTypeVar {
  value: Value = ''

  constructor(value: Value = '') {
    this.value = value
  }

  encode(data: JSONValue): BType {
    return new BClassValue(data as string)
  }

  decode(): JSONValue {
    return this.value
  }
}

export class BClassVar implements BTypeValue {
  value: Value = ''

  constructor(value: Value = '') {
    this.value = value
  }

  encode(data: JSONValue): BType {
    const obj = data as JSONObject
    return new BClassVar(obj.var as string)
  }

  decode(): JSONValue {
    return {
      var: this.value,
    }
  }
}

export class BClassDate implements BTypeDate {
  value: BTypeVar = new BClassVar()
  number: number = 0
  duration: string = DURATION_DAYS

  constructor(
    value: BTypeValue = new BClassValue(),
    number: number = 0,
    duration: string = DURATION_DAYS
  ) {
    this.value = value
    this.number = number
    this.duration = duration
  }

  encode(data: JSONValue): BType {
    const obj = data as JSONObject
    const arr = obj.plusTime as JSONArray
    return new BClassDate(encode(arr[0]) as BTypeValue, arr[1] as number, arr[2] as string)
  }

  decode(immunizationRules?: JSONArray, excludeCustomProperties?: boolean): JSONValue {
    return {
      plusTime: [
        this.value.decode(immunizationRules, excludeCustomProperties),
        this.number,
        this.duration,
      ],
    }
  }
}

export class BClassCompare implements BTypeCompare {
  variableA: BType
  variableB: BType
  operator: string

  constructor(
    variableA: BType = new BClassEmpty(),
    variableB: BType = new BClassEmpty(),
    operator: string = OPERATOR_EQUALS
  ) {
    this.variableA = variableA
    this.variableB = variableB
    this.operator = operator
  }

  encode(data: JSONValue): BType {
    const obj = data as JSONObject
    const keys = Object.keys(obj)
    const arr = obj[keys[0]] as JSONArray
    return new BClassCompare(encode(arr[0]), encode(arr[1]), keys[0])
  }

  decode(immunizationRules?: JSONArray, excludeCustomProperties?: boolean): JSONValue {
    return {
      [this.operator]: [
        this.variableA.decode(immunizationRules, excludeCustomProperties),
        this.variableB.decode(immunizationRules, excludeCustomProperties),
      ],
    }
  }
}

export class BClassCompareDate implements BTypeCompareDate {
  variableA: BType
  variableB: BType
  operator: string

  constructor(
    variableA: BType = new BClassEmpty(),
    variableB: BType = new BClassEmpty(),
    operator: string = OPERATOR_DATE_NOT_BEFORE
  ) {
    this.variableA = variableA
    this.variableB = variableB
    this.operator = operator
  }

  encode(data: JSONValue): BType {
    const obj = data as JSONObject
    const keys = Object.keys(obj)
    const arr = obj[keys[0]] as JSONArray
    return new BClassCompareDate(encode(arr[0]), encode(arr[1]), keys[0])
  }

  decode(immunizationRules?: JSONArray, excludeCustomProperties?: boolean): JSONValue {
    return {
      [this.operator]: [
        this.variableA.decode(immunizationRules, excludeCustomProperties),
        this.variableB.decode(immunizationRules, excludeCustomProperties),
      ],
    }
  }
}

export class BClassCompareIn implements BTypeCompareIn {
  variable: BType
  values: string[]

  constructor(variable: BType = new BClassEmpty(), values: string[] = []) {
    this.variable = variable
    this.values = values
  }

  encode(data: JSONValue): BType {
    const obj = data as JSONObject
    const arr = obj.in as JSONArray
    return new BClassCompareIn(encode(arr[0]), arr[1] as string[])
  }

  decode(immunizationRules?: JSONArray, excludeCustomProperties?: boolean): JSONValue {
    return {
      in: [this.variable.decode(immunizationRules, excludeCustomProperties), this.values],
    }
  }
}

export class BClassAnd implements BTypeAnd {
  conditions: BType[]

  constructor(conditions: BType[] = []) {
    this.conditions = conditions
  }

  encode(data: JSONValue): BType {
    const obj = data as JSONObject
    const arr = obj.and as JSONArray
    return new BClassAnd(arr.map(a => encode(a)))
  }

  decode(immunizationRules?: JSONArray, excludeCustomProperties?: boolean): JSONValue {
    return {
      and: this.conditions.map(c => c.decode(immunizationRules, excludeCustomProperties)),
    }
  }
}

export class BClassCertificateType implements BTypeCertificateType {
  type: string
  conditionTrue: BType

  constructor(
    type: string = CERTIFICATE_TYPE_VACCINATION,
    conditionTrue: BType = new BClassEmpty()
  ) {
    this.type = type
    this.conditionTrue = conditionTrue
  }

  encode(data: JSONValue): BType {
    const obj = data as JSONObject
    const arr = obj.if as JSONArray
    const typeVar = (arr[0] as JSONObject).var as string

    let type = CERTIFICATE_TYPE_VACCINATION
    if (typeVar === 'payload.t.0') {
      type = CERTIFICATE_TYPE_TEST
    }
    if (typeVar === 'payload.r.0') {
      type = CERTIFICATE_TYPE_RECOVERY
    }

    return new BClassCertificateType(type, encode(arr[1] as JSONObject))
  }

  decode(immunizationRules?: JSONArray, excludeCustomProperties?: boolean): JSONValue {
    let typeVar = 'payload.v.0'
    if (this.type === CERTIFICATE_TYPE_TEST) {
      typeVar = 'payload.t.0'
    }
    if (this.type === CERTIFICATE_TYPE_RECOVERY) {
      typeVar = 'payload.r.0'
    }

    const res: JSONObject = {
      if: [
        { var: typeVar },
        this.conditionTrue.decode(immunizationRules, excludeCustomProperties),
        false,
      ],
    }
    if (excludeCustomProperties !== true) {
      res.type = 'certificate-type'
    }
    return res
  }
}

export class BClassImmunizationStatus implements BTypeImmunizationStatus {
  status: string
  vaccines: string[]
  conditionTrue: BType

  constructor(
    status: string = IMMUNIZATION_STATUS_FULL,
    vaccines: string[] = [],
    conditionTrue: BType = new BClassEmpty()
  ) {
    this.status = status
    this.vaccines = vaccines
    this.conditionTrue = conditionTrue
  }

  encode(data: JSONValue): BType {
    const obj = data as JSONObject
    const arr = obj.if as JSONArray
    const status = obj.status as string
    const vaccines = (
      (((arr[0] as JSONObject).and as JSONArray)[0] as JSONObject).in as JSONArray
    )[1] as string[]

    return new BClassImmunizationStatus(status, vaccines, encode(arr[1] as JSONObject))
  }

  decode(immunizationRules?: JSONArray, excludeCustomProperties?: boolean): JSONValue {
    // filter all active immunization rules and add them to the immunization-status component
    const tmpRules =
      immunizationRules
        ?.filter(rule => (rule as JSONObject).type === this.status)
        .map(rule => rule as JSONObject) ?? []
    const activeRules = [
      ...new Set(
        this.vaccines
          .map(mp => tmpRules.filter(rule => (rule.medicalProducts as string[]).includes(mp)))
          .flat(1)
      ),
    ].map(rule => rule.rule)
    const activeRulesComp = activeRules.length > 1 ? createOrOperation(activeRules) : activeRules[0]

    const res: JSONObject = {
      if: [
        {
          and: [
            {
              in: [
                {
                  var: 'payload.v.0.mp',
                },
                this.vaccines,
              ],
            },
            activeRulesComp,
          ],
        },
        this.conditionTrue.decode(immunizationRules, excludeCustomProperties),
        false,
      ],
    }
    if (excludeCustomProperties !== true) {
      res.type = 'immunization-status'
      res.status = this.status
    }
    return res
  }
}

function createOrOperation(rules: JSONValue[]): JSONValue {
  const arr = rules
  const con = arr.shift()
  if (arr.length == 0) {
    return con as JSONObject
  }
  return {
    if: [con, true, createOrOperation(arr)],
  } as JSONObject
}

export function encode(data: JSONValue): BType {
  if (data === null) {
    return new BClassEmpty()
  }
  if (typeof data === 'object') {
    if ('type' in data) {
      // custom types
      if (data.type === 'certificate-type') {
        return new BClassCertificateType().encode(data)
      }
      if (data.type === 'immunization-status') {
        return new BClassImmunizationStatus().encode(data)
      }
    }
    if ('var' in data) {
      return new BClassVar().encode(data)
    }
    if ('if' in data) {
      return new BClassIf().encode(data)
    }
    if ('and' in data) {
      return new BClassAnd().encode(data)
    }
    if ('in' in data) {
      return new BClassCompareIn().encode(data)
    }
    if ('plusTime' in data) {
      return new BClassDate().encode(data)
    }
    if (DURATION_HOURS in data || DURATION_DAYS in data) {
      return new BClassDate().encode(data)
    }
    if (OPERATOR_EQUALS in data || OPERATOR_GREATER in data || OPERATOR_GREATER_EQUALS in data) {
      return new BClassCompare().encode(data)
    }
    if (OPERATOR_DATE_NOT_BEFORE in data || OPERATOR_DATE_NOT_AFTER in data) {
      return new BClassCompareDate().encode(data)
    }
  } else if (typeof data == 'string' || typeof data == 'number' || typeof data == 'boolean') {
    return new BClassValue(data)
  }
  return new BClassEmpty()
}
