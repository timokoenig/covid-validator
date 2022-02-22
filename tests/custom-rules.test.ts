/* eslint-disable @typescript-eslint/no-non-null-assertion */
import moment from 'moment'
import builderStateRulesDE from '../utils/builder-state-rules-de.json'
import { CustomRule, exportRules, Rule, validateDCCRule } from '../utils/certlogic'
import { DigitalGreenCertificate } from '../utils/dcc'

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

const TEST_NEGATIVE = '260415000'
const TEST_POSITIVE = '260373001'

/// Helper functions
function validate(
  dgc: DigitalGreenCertificate,
  rules: (Rule | null)[],
  validationClock: Date
): boolean {
  const results = rules.map(rule => {
    if (rule === null) return { valid: false }
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

const date = moment('2022-02-15T20:00:00Z').toDate()

const customRule = builderStateRulesDE as CustomRule
const localRulesHamburg = exportRules(customRule, true)

/// Tests
/////////////////// BioNTech ///////////////////
test('BioNTech; Partial Immunization; INVALID', () => {
  const dcc = { ...vaccinationDCC }
  dcc.v![0].dn = 1
  dcc.v![0].sd = 2

  expect(validate(dcc, localRulesHamburg, date)).toBeFalsy()
})
test('BioNTech; Full Immunization; VALID', () => {
  const dcc = { ...vaccinationDCC }
  dcc.v![0].dn = 2
  dcc.v![0].sd = 2

  expect(validate(dcc, localRulesHamburg, date)).toBeTruthy()
})

test('BioNTech; Full Immunization shortly after vaccination; INVALID', () => {
  const dcc = { ...vaccinationDCC }
  dcc.v![0].dn = 2
  dcc.v![0].sd = 2

  expect(validate(dcc, localRulesHamburg, moment('2022-01-10').toDate())).toBeFalsy()
})
test('BioNTech; Full Immunization in one year; VALID', () => {
  const dcc = { ...vaccinationDCC }
  dcc.v![0].dn = 2
  dcc.v![0].sd = 2

  expect(validate(dcc, localRulesHamburg, moment('2023-02-15').toDate())).toBeTruthy()
})
test('BioNTech; Full Immunization after Recovery; VALID', () => {
  const dcc = { ...vaccinationDCC }
  dcc.v![0].dn = 1
  dcc.v![0].sd = 1

  expect(validate(dcc, localRulesHamburg, date)).toBeTruthy()
})
test('BioNTech; Full Immunization after Recovery shortly after vaccination; VALID', () => {
  const dcc = { ...vaccinationDCC }
  dcc.v![0].dn = 1
  dcc.v![0].sd = 1

  expect(validate(dcc, localRulesHamburg, moment('2022-01-10').toDate())).toBeTruthy()
})
test('BioNTech; Booster Immunization; VALID', () => {
  const dcc = { ...vaccinationDCC }
  dcc.v![0].dn = 3
  dcc.v![0].sd = 3

  expect(validate(dcc, localRulesHamburg, date)).toBeTruthy()
})
test('BioNTech; Booster 2 Immunization; VALID', () => {
  const dcc = { ...vaccinationDCC }
  dcc.v![0].dn = 4
  dcc.v![0].sd = 4

  expect(validate(dcc, localRulesHamburg, date)).toBeTruthy()
})
test('BioNTech; Booster Immunization shortly after vaccination; VALID', () => {
  const dcc = { ...vaccinationDCC }
  dcc.v![0].dn = 3
  dcc.v![0].sd = 3

  expect(validate(dcc, localRulesHamburg, moment('2022-01-10').toDate())).toBeTruthy()
})
test('BioNTech; Booster Immunization in one year; VALID', () => {
  const dcc = { ...vaccinationDCC }
  dcc.v![0].dn = 3
  dcc.v![0].sd = 3

  expect(validate(dcc, localRulesHamburg, moment('2023-02-15').toDate())).toBeTruthy()
})
test('BioNTech; Booster Immunization after Recovery; VALID', () => {
  const dcc = { ...vaccinationDCC }
  dcc.v![0].dn = 2
  dcc.v![0].sd = 1

  expect(validate(dcc, localRulesHamburg, date)).toBeTruthy()
})

/////////////////// J&J ///////////////////
test('J&J; Partial Immunization; INVALID', () => {
  const dcc = { ...vaccinationDCC }
  dcc.v![0].mp = 'EU/1/20/1525'
  dcc.v![0].dn = 1
  dcc.v![0].sd = 1

  expect(validate(dcc, localRulesHamburg, date)).toBeFalsy()
})
test('J&J; Full Immunization; VALID', () => {
  const dcc = { ...vaccinationDCC }
  dcc.v![0].mp = 'EU/1/20/1525'
  dcc.v![0].dn = 2
  dcc.v![0].sd = 2

  expect(validate(dcc, localRulesHamburg, date)).toBeTruthy()
})
test('J&J; Booster Immunization; VALID', () => {
  const dcc = { ...vaccinationDCC }
  dcc.v![0].mp = 'EU/1/20/1525'
  dcc.v![0].dn = 3
  dcc.v![0].sd = 3

  expect(validate(dcc, localRulesHamburg, date)).toBeTruthy()
})
test('J&J; Booster Immunization after Recovery; VALID', () => {
  const dcc = { ...vaccinationDCC }
  dcc.v![0].mp = 'EU/1/20/1525'
  dcc.v![0].dn = 2
  dcc.v![0].sd = 1

  expect(validate(dcc, localRulesHamburg, date)).toBeTruthy()
})

/////////////////// Special Cases ///////////////////
test('Special; Full Immunization with unregistered mp; INVALID', () => {
  const dcc = { ...vaccinationDCC }
  dcc.v![0].mp = 'the-special-stuff'
  dcc.v![0].dn = 2
  dcc.v![0].sd = 2

  expect(validate(dcc, localRulesHamburg, date)).toBeFalsy()
})

/////////////////// Recovery ///////////////////
test('Recovery after 10 days; INVALID', () => {
  expect(validate(recoveryDCC, localRulesHamburg, moment('2022-01-20').toDate())).toBeFalsy()
})
test('Recovery after 30 days; VALID', () => {
  expect(validate(recoveryDCC, localRulesHamburg, moment('2022-02-09').toDate())).toBeTruthy()
})
test('Recovery after 190 days; INVALID', () => {
  expect(validate(recoveryDCC, localRulesHamburg, moment('2022-07-19').toDate())).toBeFalsy()
})

/////////////////// Test ///////////////////
test('Antigen after 10 hours; VALID', () => {
  const dcc = { ...testDCC }
  dcc.t![0].tr = TEST_NEGATIVE

  expect(validate(dcc, localRulesHamburg, date)).toBeTruthy()
})
test('Antigen after 30 hours; INVALID', () => {
  const dcc = { ...testDCC }
  dcc.t![0].tr = TEST_NEGATIVE

  expect(validate(dcc, localRulesHamburg, moment('2022-02-16T16:00:00Z').toDate())).toBeFalsy()
})
test('Positive Antigen; INVALID', () => {
  const dcc = { ...testDCC }
  dcc.t![0].tr = TEST_POSITIVE

  expect(validate(dcc, localRulesHamburg, date)).toBeFalsy()
})
test('PCR after 10 hours; VALID', () => {
  const dcc = { ...testDCC }
  dcc.t![0].tt = 'LP6464-4'
  dcc.t![0].tr = TEST_NEGATIVE

  expect(validate(dcc, localRulesHamburg, date)).toBeTruthy()
})
test('PCR after 80 hours; INVALID', () => {
  const dcc = { ...testDCC }
  dcc.t![0].tt = 'LP6464-4'
  dcc.t![0].tr = TEST_NEGATIVE

  expect(validate(dcc, localRulesHamburg, moment('2022-02-18T18:00:00Z').toDate())).toBeFalsy()
})
test('Positive PCR less than 28 days; INVALID', () => {
  const dcc = { ...testDCC }
  dcc.t![0].tt = 'LP6464-4'
  dcc.t![0].tr = TEST_POSITIVE

  expect(validate(dcc, localRulesHamburg, date)).toBeFalsy()
})
test('Positive PCR between 28 and 180 days; Recoverd; VALID', () => {
  const dcc = { ...testDCC }
  dcc.t![0].tt = 'LP6464-4'
  dcc.t![0].tr = TEST_POSITIVE

  expect(validate(dcc, localRulesHamburg, moment('2022-03-17').toDate())).toBeTruthy()
})
test('Positive PCR after 180 days; INVALID', () => {
  const dcc = { ...testDCC }
  dcc.t![0].tt = 'LP6464-4'
  dcc.t![0].tr = TEST_POSITIVE

  expect(validate(dcc, localRulesHamburg, moment('2022-08-15').toDate())).toBeFalsy()
})
test('Unknown Test after 10 hours; INVALID', () => {
  const dcc = { ...testDCC }
  dcc.t![0].tt = 'taste-test'
  dcc.t![0].tr = TEST_NEGATIVE

  expect(validate(dcc, localRulesHamburg, date)).toBeFalsy()
})

export {}
