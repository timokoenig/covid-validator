/* eslint-disable @typescript-eslint/no-non-null-assertion */
import moment from 'moment'
import { Rule, validateDCCRule } from '../utils/certlogic'
import { DigitalGreenCertificate } from '../utils/dcc'
import localRulesHamburg from '../utils/local-rules-hamburg.json'

// const localRulesHamburg: Rule[] = [
//   {
//     Identifier: '8bb12070-0e1e-44eb-8b9a-651ef0ec8a6d',
//     Type: 'Acceptance',
//     Country: 'DE',
//     Version: '1.0.0',
//     SchemaVersion: '1.0.0',
//     Engine: 'CERTLOGIC',
//     EngineVersion: '0.7.5',
//     CertificateType: 'Vaccination',
//     Description: [
//       {
//         lang: 'en',
//         desc: 'Complete vaccination series must be at least 14 days ago and not longer than 270 days ago',
//       },
//     ],
//     ValidFrom: '2022-01-01T00:00:00Z',
//     ValidTo: '2023-01-01T00:00:00Z',
//     AffectedFields: [
//       'payload.v.0',
//       'payload.v.0.mp',
//       'payload.v.0.dt',
//       'payload.v.0.dn',
//       'payload.v.0.sd',
//     ],
//     Logic: {
//       if: [
//         {
//           and: [
//             {
//               var: 'payload.v.0',
//             },
//             {
//               in: [
//                 {
//                   var: 'payload.v.0.mp',
//                 },
//                 ['EU/1/20/1528', 'EU/1/20/1507', 'EU/1/21/1529', 'EU/1/21/1618', 'EU/1/20/1525'],
//               ],
//             },
//             {
//               and: [
//                 {
//                   '===': [
//                     {
//                       var: 'payload.v.0.dn',
//                     },
//                     2,
//                   ],
//                 },
//                 {
//                   '===': [
//                     {
//                       var: 'payload.v.0.sd',
//                     },
//                     2,
//                   ],
//                 },
//                 {
//                   '===': [
//                     {
//                       var: 'payload.v.0.dn',
//                     },
//                     {
//                       var: 'payload.v.0.sd',
//                     },
//                   ],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           if: [
//             {
//               and: [
//                 {
//                   'not-before': [
//                     {
//                       plusTime: [
//                         {
//                           var: 'external.validationClock',
//                         },
//                         0,
//                         'day',
//                       ],
//                     },
//                     {
//                       plusTime: [
//                         {
//                           var: 'payload.v.0.dt',
//                         },
//                         15,
//                         'day',
//                       ],
//                     },
//                   ],
//                 },
//                 {
//                   'not-after': [
//                     {
//                       plusTime: [
//                         {
//                           var: 'external.validationClock',
//                         },
//                         0,
//                         'day',
//                       ],
//                     },
//                     {
//                       plusTime: [
//                         {
//                           var: 'payload.v.0.dt',
//                         },
//                         270,
//                         'day',
//                       ],
//                     },
//                   ],
//                 },
//               ],
//             },
//             true,
//             false,
//           ],
//         },
//         false,
//       ],
//     },
//   },
// ]

/// DCCs
const vaccinationDCC: DigitalGreenCertificate = {
  v: [
    {
      ci: 'URN:UVCI:01DE/A22123456/1CABCDEFGHIJ1EF44ABVCT#H',
      co: 'DE',
      dn: 3,
      dt: '2022-01-05',
      is: 'Robert Koch-Institut',
      ma: 'ORG-100030215',
      mp: 'EU/1/20/1528',
      sd: 3,
      tg: '840539006',
      vp: '1119349007',
    },
  ],
  dob: '1970-01-01',
  nam: {
    fn: 'Bar',
    gn: 'Foo',
    fnt: 'FOO',
    gnt: 'BAR',
  },
  ver: '1.3.0',
}

const recoveryDCC: DigitalGreenCertificate = {
  r: [
    {
      ci: 'URN:UVCI:01DE/A22123456/1CABCDEFGHIJ1EF44ABVCT#H',
      co: 'DE',
      df: '2022-05-29',
      du: '2022-06-15',
      fr: '2022-01-10',
      is: 'Robert Koch-Institut',
      tg: '840539006',
    },
  ],
  dob: '1970-01-01',
  nam: {
    fn: 'Bar',
    gn: 'Foo',
    fnt: 'FOO',
    gnt: 'BAR',
  },
  ver: '1.3.0',
}

const testDCC: DigitalGreenCertificate = {
  t: [
    {
      ci: 'URN:UVCI:01DE/A22123456/1CABCDEFGHIJ1EF44ABVCT#H',
      co: 'DE',
      is: 'Robert Koch-Institut',
      sc: '2022-02-15T10:00:00Z',
      tc: 'Testzentrum Hamburg Hbf',
      tg: '840539006',
      tr: '260415000',
      tt: 'LP217198-3',
    },
  ],
  dob: '1970-01-01',
  nam: {
    fn: 'Bar',
    gn: 'Foo',
    fnt: 'FOO',
    gnt: 'BAR',
  },
  ver: '1.3.0',
}

/// Helper functions
function validate(dgc: DigitalGreenCertificate, rules: Rule[], validationClock: Date): boolean {
  const results = rules.map(rule => {
    return validateDCCRule(rule, {
      payload: dgc,
      external: {
        valueSets: [],
        validationClock: validationClock.toISOString(),
      },
    })
  })
  return results.find(res => res.valid) !== undefined
}

// const countryRules = (countryBusinessRules as Rules).rules
//   .filter(rule => rule.Country == 'DE')
//   .filter(rule => rule.Type == 'Acceptance')
//   .filter(rule => moment() >= moment(rule.ValidFrom) && moment() < moment(rule.ValidTo))
const countryRules: Rule[] = localRulesHamburg

const date = moment('2022-02-15T20:00:00Z').toDate()

/// Tests
/////////////////// BioNTech ///////////////////
test('BioNTech; Partial Immunization; INVALID', () => {
  const dcc = { ...vaccinationDCC }
  dcc.v![0].dn = 1
  dcc.v![0].sd = 2

  // const results = countryRules.map(rule => {
  //   return validateDCCRule(rule, {
  //     payload: dcc,
  //     external: {
  //       valueSets: [],
  //       validationClock: date.toISOString(),
  //     },
  //   })
  // })

  // console.log(results.find(res => res.valid))
  // expect(results.find(res => res.valid) !== undefined).toBeFalsy()
  expect(validate(dcc, countryRules, date)).toBeFalsy()
})
test('BioNTech; Full Immunization; VALID', () => {
  const dcc = { ...vaccinationDCC }
  dcc.v![0].dn = 2
  dcc.v![0].sd = 2

  expect(validate(dcc, countryRules, date)).toBeTruthy()
})

/// TODOOOOOO
// first we need to move the immunization status into the pre-condition
// then we need to add an extra rule that will check for the negative of all pre-conditions so we do not return true for any certificates that does not match our rules
// then create PR to add OR operator into the certlogic-js library

/// << lets make it so that rules always return fails and the first valid rule grants acess
// This makes it from a user perspective much easier, > everything is not allowed until a rule says so
// -> whitelist

test('BioNTech; Full Immunization shortly after vaccination; INVALID', () => {
  const dcc = { ...vaccinationDCC }
  dcc.v![0].dn = 2
  dcc.v![0].sd = 2

  expect(validate(dcc, countryRules, moment('2022-01-10').toDate())).toBeFalsy()
})
test('BioNTech; Full Immunization in one year; INVALID', () => {
  const dcc = { ...vaccinationDCC }
  dcc.v![0].dn = 2
  dcc.v![0].sd = 2

  expect(validate(dcc, countryRules, moment('2023-02-15').toDate())).toBeFalsy()
})
test('BioNTech; Full Immunization after Recovery; VALID', () => {
  const dcc = { ...vaccinationDCC }
  dcc.v![0].dn = 1
  dcc.v![0].sd = 1

  expect(validate(dcc, countryRules, date)).toBeTruthy()
})
test('BioNTech; Full Immunization after Recovery shortly after vaccination; VALID', () => {
  const dcc = { ...vaccinationDCC }
  dcc.v![0].dn = 1
  dcc.v![0].sd = 1

  expect(validate(dcc, countryRules, moment('2022-01-10').toDate())).toBeTruthy()
})
test('BioNTech; Booster Immunization; VALID', () => {
  const dcc = { ...vaccinationDCC }
  dcc.v![0].dn = 3
  dcc.v![0].sd = 3

  expect(validate(dcc, countryRules, date)).toBeTruthy()
})
test('BioNTech; Booster Immunization shortly after vaccination; VALID', () => {
  const dcc = { ...vaccinationDCC }
  dcc.v![0].dn = 3
  dcc.v![0].sd = 3

  expect(validate(dcc, countryRules, moment('2022-01-10').toDate())).toBeTruthy()
})
test('BioNTech; Booster Immunization in one year; VALID', () => {
  const dcc = { ...vaccinationDCC }
  dcc.v![0].dn = 3
  dcc.v![0].sd = 3

  expect(validate(dcc, countryRules, moment('2023-02-15').toDate())).toBeTruthy()
})
test('BioNTech; Booster Immunization after Recovery; VALID', () => {
  const dcc = { ...vaccinationDCC }
  dcc.v![0].dn = 2
  dcc.v![0].sd = 1

  expect(validate(dcc, countryRules, date)).toBeTruthy()
})

/////////////////// J&J ///////////////////
test('J&J; Partial Immunization; INVALID', () => {
  const dcc = { ...vaccinationDCC }
  dcc.v![0].mp = 'EU/1/20/1525'
  dcc.v![0].dn = 1
  dcc.v![0].sd = 1

  expect(validate(dcc, countryRules, date)).toBeFalsy()
})
test('J&J; Full Immunization; VALID', () => {
  const dcc = { ...vaccinationDCC }
  dcc.v![0].mp = 'EU/1/20/1525'
  dcc.v![0].dn = 2
  dcc.v![0].sd = 2

  expect(validate(dcc, countryRules, date)).toBeTruthy()
})
test('J&J; Booster Immunization; VALID', () => {
  const dcc = { ...vaccinationDCC }
  dcc.v![0].mp = 'EU/1/20/1525'
  dcc.v![0].dn = 3
  dcc.v![0].sd = 3

  expect(validate(dcc, countryRules, date)).toBeTruthy()
})
test('J&J; Booster Immunization after Recovery; VALID', () => {
  const dcc = { ...vaccinationDCC }
  dcc.v![0].mp = 'EU/1/20/1525'
  dcc.v![0].dn = 2
  dcc.v![0].sd = 1

  expect(validate(dcc, countryRules, date)).toBeTruthy()
})

/////////////////// Special Cases ///////////////////
test('Special; Full Immunization with unregistered mp; INVALID', () => {
  const dcc = { ...vaccinationDCC }
  dcc.v![0].mp = 'the-special-stuff'
  dcc.v![0].dn = 2
  dcc.v![0].sd = 2

  expect(validate(dcc, countryRules, date)).toBeFalsy()
})

/////////////////// Recovery ///////////////////
test('Recovery after 10 days; INVALID', () => {
  expect(validate(recoveryDCC, countryRules, moment('2022-01-20').toDate())).toBeFalsy()
})
test('Recovery after 30 days; VALID', () => {
  expect(validate(recoveryDCC, countryRules, moment('2022-02-09').toDate())).toBeTruthy()
})

/////////////////// Test ///////////////////
test('Antigen after 10 hours; VALID', () => {
  expect(validate(testDCC, countryRules, date)).toBeTruthy()
})
test('Antigen after 30 hours; INVALID', () => {
  expect(validate(testDCC, countryRules, moment('2022-02-16T16:00:00Z').toDate())).toBeFalsy()
})
test('PCR after 10 hours; VALID', () => {
  const dcc = { ...testDCC }
  dcc.t![0].tt = 'LP6464-4'

  expect(validate(dcc, countryRules, date)).toBeTruthy()
})
test('PCR after 80 hours; INVALID', () => {
  const dcc = { ...testDCC }
  dcc.t![0].tt = 'LP6464-4'

  expect(validate(dcc, countryRules, moment('2022-02-18T18:00:00Z').toDate())).toBeFalsy()
})
test('Unknown Test after 10 hours; INVALID', () => {
  const dcc = { ...testDCC }
  dcc.t![0].tt = 'taste-test'

  expect(validate(dcc, countryRules, date)).toBeFalsy()
})

export {}
