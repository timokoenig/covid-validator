import {
  BType,
  BTypeAnd,
  BTypeCompare,
  BTypeCompareDate,
  BTypeCompareIn,
  BTypeDate,
  BTypeIf,
  BTypeValue,
  BTypeVar,
  DURATION_DAYS,
  DURATION_HOURS,
  JSONArray,
  JSONObject,
  JSONValue,
  OPERATOR_DATE_AFTER,
  OPERATOR_DATE_BEFORE,
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

  decode(): JSONValue {
    return {
      if: [this.condition.decode(), this.conditionTrue.decode(), this.conditionFalse.decode()],
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

  decode(): JSONValue {
    return {
      plusTime: [this.value.decode(), this.number, this.duration],
    }
  }
}

export class BClassCompare implements BTypeCompare {
  variableA: BTypeValue
  variableB: BTypeValue
  operator: string

  constructor(
    variableA: BTypeValue = new BClassValue(),
    variableB: BTypeValue = new BClassValue(),
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
    return new BClassCompare(encode(arr[0]) as BTypeValue, encode(arr[1]) as BTypeValue, keys[0])
  }

  decode(): JSONValue {
    return {
      [this.operator]: [this.variableA.decode(), this.variableB.decode()],
    }
  }
}

export class BClassCompareDate implements BTypeCompareDate {
  variableA: BTypeValue
  variableB: BTypeValue
  operator: string

  constructor(
    variableA: BTypeValue = new BClassValue(),
    variableB: BTypeValue = new BClassValue(),
    operator: string = OPERATOR_DATE_BEFORE
  ) {
    this.variableA = variableA
    this.variableB = variableB
    this.operator = operator
  }

  encode(data: JSONValue): BType {
    const obj = data as JSONObject
    const keys = Object.keys(obj)
    const arr = obj[keys[0]] as JSONArray
    return new BClassCompare(encode(arr[0]) as BTypeValue, encode(arr[1]) as BTypeValue, keys[0])
  }

  decode(): JSONValue {
    return {
      [this.operator]: [this.variableA.decode(), this.variableB.decode()],
    }
  }
}

export class BClassCompareIn implements BTypeCompareIn {
  variable: BTypeVar
  values: string[]

  constructor(variable: BTypeVar = new BClassVar(), values: string[] = []) {
    this.variable = variable
    this.values = values
  }

  encode(data: JSONValue): BType {
    const obj = data as JSONObject
    const arr = obj.in as JSONArray
    return new BClassCompareIn(encode(arr[0]) as BTypeVar, arr[1] as string[])
  }

  decode(): JSONValue {
    return {
      in: [this.variable.decode(), this.values],
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

  decode(): JSONValue {
    return {
      and: this.conditions.map(c => c.decode()),
    }
  }
}

// export class BClassImmunizationStatus implements BType {
//   status: string
//   // type: string = 'immunization-status'

//   constructor(status: string = IMMUNIZATION_STATUS_FULL) {
//     this.status = status
//   }

//   decode(): JSONValue {
//     // TODO implement status json logic
//     return {}
//   }
// }

export function encode(data: JSONValue): BType {
  if (typeof data === 'object') {
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
    if (OPERATOR_DATE_BEFORE in data || OPERATOR_DATE_AFTER in data) {
      return new BClassCompareDate().encode(data)
    }
  } else if (typeof data == 'string' || typeof data == 'number' || typeof data == 'boolean') {
    return new BClassValue(data)
  }
  return new BClassEmpty()
}
