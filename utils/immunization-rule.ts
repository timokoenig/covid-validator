/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

export function encodeImmunizationRule(dn: string, sn: string, symbol: string): {} {
  const rules: any[] = []
  // rule to compare fixed dn
  if (dn !== '*') {
    rules.push({
      '==': [
        {
          var: 'payload.v.0.dn',
        },
        parseInt(dn, 10),
      ],
    })
  }

  // rule to compare fixed sn
  if (sn !== '*') {
    rules.push({
      '==': [
        {
          var: 'payload.v.0.sn',
        },
        parseInt(sn, 10),
      ],
    })
  }

  // Base rules to compare dn and sn
  const rule: any = {}
  rule[symbol] = [
    {
      var: 'payload.v.0.dn',
    },
    {
      var: 'payload.v.0.sn',
    },
  ]
  rules.push(rule)

  return rules.length == 1
    ? rules[0]
    : {
        and: rules,
      }
}

export function decodeImmunizationRule(rule: any): { dn: string; sn: string; symbol: string } {
  if (!Object.keys(rule).includes('and')) {
    return { dn: '*', sn: '*', symbol: Object.keys(rule)[0] }
  }
  if (rule.and.length === 3) {
    return {
      dn: rule.and[0]['=='][1] as string,
      sn: rule.and[1]['=='][1] as string,
      symbol: Object.keys(rule.and[2])[0],
    }
  }
  if (rule.and.length === 2) {
    const isDn = (rule.and[0]['=='][0].var as string).includes('dn')
    return {
      dn: isDn ? (rule.and[0]['=='][1] as string) : '*',
      sn: isDn ? '*' : (rule.and[0]['=='][1] as string),
      symbol: Object.keys(rule.and[2])[0],
    }
  }
  return {
    dn: '',
    sn: '',
    symbol: '',
  }
}
