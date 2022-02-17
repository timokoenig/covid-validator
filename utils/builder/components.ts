import {
  BType,
  BTypeAnd,
  BTypeCompare,
  BTypeCompareDate,
  BTypeCompareIn,
  BTypeDate,
  BTypeIf,
  BTypeOr,
  BTypeValue,
  BTypeVar,
  DURATION_DAYS,
  IMMUNIZATION_STATUS_FULL,
  JSONValue,
  OPERATOR_DATE_BEFORE,
  OPERATOR_EQUALS,
} from './types'

export class BComponentEmpty implements BType {
  jsonLogic(): JSONValue {
    return {}
  }
}

export class BComponentIf implements BTypeIf {
  condition: BType = new BComponentEmpty()
  true: BType = new BComponentEmpty()
  false: BType = new BComponentEmpty()
  jsonLogic(): JSONValue {
    return {
      if: [this.condition.jsonLogic(), this.true.jsonLogic(), this.false.jsonLogic()],
    }
  }
}

export class BComponentValue implements BTypeVar {
  value: string = ''
  jsonLogic(): JSONValue {
    return this.value
  }
}

export class BComponentVar implements BTypeValue {
  value: string = ''
  jsonLogic(): JSONValue {
    return {
      var: this.value,
    }
  }
}

export class BComponentDate implements BTypeDate {
  value: BTypeVar = new BComponentVar()
  number: number = 0
  duration: string = DURATION_DAYS
  jsonLogic(): JSONValue {
    return {
      plusTime: [this.value.jsonLogic(), this.number, this.duration],
    }
  }
}

export class BComponentCompare implements BTypeCompare {
  varA: BTypeValue = new BComponentValue()
  varB: BTypeValue = new BComponentValue()
  operator: string = OPERATOR_EQUALS
  jsonLogic(): JSONValue {
    return {
      [this.operator]: [this.varA.jsonLogic(), this.varB.jsonLogic()],
    }
  }
}

export class BComponentCompareDate implements BTypeCompareDate {
  varA: BTypeValue = new BComponentValue()
  varB: BTypeValue = new BComponentValue()
  operator: string = OPERATOR_DATE_BEFORE
  jsonLogic(): JSONValue {
    return {
      [this.operator]: [this.varA.jsonLogic(), this.varB.jsonLogic()],
    }
  }
}

export class BComponentCompareIn implements BTypeCompareIn {
  var: BTypeVar = new BComponentVar()
  values: string[] = []
  jsonLogic(): JSONValue {
    return {
      in: [this.var.jsonLogic(), this.values],
    }
  }
}

export class BComponentAnd implements BTypeAnd {
  conditions: BType[] = []
  jsonLogic(): JSONValue {
    return {
      and: this.conditions.map(c => c.jsonLogic()),
    }
  }
}

function createOrOperation(types: BType[]): JSONValue {
  const arr = types
  const con = arr.shift()
  if (con === undefined) {
    return true
  }
  if (arr.length == 0) {
    return con.jsonLogic()
  }
  return {
    if: [con.jsonLogic(), true, createOrOperation(arr)],
  }
}

export class BComponentOr implements BTypeOr {
  conditions: BType[] = []
  jsonLogic(): JSONValue {
    return createOrOperation(this.conditions)
  }
}

export class BComponentImmunizationStatus implements BType {
  status: string = IMMUNIZATION_STATUS_FULL
  jsonLogic(): JSONValue {
    // TODO implement status json logic
    return {}
  }
}
