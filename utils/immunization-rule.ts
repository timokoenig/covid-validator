/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

export function encodeImmunizationRule(dn: string, sd: string, symbol: string): {} {
  const rules: any[] = []
  // rule to compare fixed dn
  if (dn !== '*') {
    rules.push({
      '===': [
        {
          var: 'payload.v.0.dn',
        },
        parseInt(dn, 10),
      ],
    })
  }

  // rule to compare fixed sd
  if (sd !== '*') {
    rules.push({
      '===': [
        {
          var: 'payload.v.0.sd',
        },
        parseInt(sd, 10),
      ],
    })
  }

  // Base rules to compare dn and sd
  const rule: any = {}
  rule[symbol] = [
    {
      var: 'payload.v.0.dn',
    },
    {
      var: 'payload.v.0.sd',
    },
  ]
  rules.push(rule)

  return rules.length == 1
    ? rules[0]
    : {
        and: rules,
      }
}

export function decodeImmunizationRule(rule: any): { dn: string; sd: string; symbol: string } {
  if (!Object.keys(rule).includes('and')) {
    return { dn: '*', sd: '*', symbol: Object.keys(rule)[0] }
  }
  if (rule.and.length === 3) {
    return {
      dn: rule.and[0]['==='][1] as string,
      sd: rule.and[1]['==='][1] as string,
      symbol: Object.keys(rule.and[2])[0],
    }
  }
  if (rule.and.length === 2) {
    const isDn = (rule.and[0]['==='][0].var as string).includes('dn')
    return {
      dn: isDn ? (rule.and[0]['==='][1] as string) : '*',
      sd: isDn ? '*' : (rule.and[0]['==='][1] as string),
      symbol: Object.keys(rule.and[2])[0],
    }
  }
  return {
    dn: '',
    sd: '',
    symbol: '',
  }
}
