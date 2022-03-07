/* eslint-disable @typescript-eslint/no-non-null-assertion */
import moment from 'moment'
import { CertLogic } from '../../utils/certlogic'
import { DCC } from '../../utils/dcc'
import { recoveryDCC, testDCC, vaccinationDCC } from './helpers'

const TEST_NEGATIVE = '260415000'
const TEST_POSITIVE = '260373001'
const date = moment('2022-02-15T20:00:00Z').toDate()

const certLogic = new CertLogic()

/// Helper functions
function validate(dcc: DCC, validationClock: Date): boolean {
  const res = certLogic.validateDCC(dcc, 'DE', 'HH', validationClock)
  return res.isValid
}

/// Tests
/////////////////// BioNTech ///////////////////
test('BioNTech; Partial Immunization; INVALID', () => {
  const dcc = vaccinationDCC()
  dcc.data.payload.hcert.dgc.v![0].dn = 1
  dcc.data.payload.hcert.dgc.v![0].sd = 2

  expect(validate(dcc, date)).toBeFalsy()
})
test('BioNTech; Full Immunization; VALID', () => {
  const dcc = vaccinationDCC()
  dcc.data.payload.hcert.dgc.v![0].dn = 2
  dcc.data.payload.hcert.dgc.v![0].sd = 2

  expect(validate(dcc, date)).toBeTruthy()
})

test('BioNTech; Full Immunization shortly after vaccination; INVALID', () => {
  const dcc = vaccinationDCC()
  dcc.data.payload.hcert.dgc.v![0].dn = 2
  dcc.data.payload.hcert.dgc.v![0].sd = 2

  expect(validate(dcc, moment('2022-01-10').toDate())).toBeFalsy()
})
test('BioNTech; Full Immunization in one year; VALID', () => {
  const dcc = vaccinationDCC()
  dcc.data.payload.hcert.dgc.v![0].dn = 2
  dcc.data.payload.hcert.dgc.v![0].sd = 2

  expect(validate(dcc, moment('2023-02-15').toDate())).toBeTruthy()
})
test('BioNTech; Full Immunization after Recovery; VALID', () => {
  const dcc = vaccinationDCC()
  dcc.data.payload.hcert.dgc.v![0].dn = 1
  dcc.data.payload.hcert.dgc.v![0].sd = 1

  expect(validate(dcc, date)).toBeTruthy()
})
test('BioNTech; Full Immunization after Recovery shortly after vaccination; VALID', () => {
  const dcc = vaccinationDCC()
  dcc.data.payload.hcert.dgc.v![0].dn = 1
  dcc.data.payload.hcert.dgc.v![0].sd = 1

  expect(validate(dcc, moment('2022-01-10').toDate())).toBeTruthy()
})
test('BioNTech; Booster Immunization; VALID', () => {
  const dcc = vaccinationDCC()
  dcc.data.payload.hcert.dgc.v![0].dn = 3
  dcc.data.payload.hcert.dgc.v![0].sd = 3

  expect(validate(dcc, date)).toBeTruthy()
})
test('BioNTech; Booster 2 Immunization; VALID', () => {
  const dcc = vaccinationDCC()
  dcc.data.payload.hcert.dgc.v![0].dn = 4
  dcc.data.payload.hcert.dgc.v![0].sd = 4

  expect(validate(dcc, date)).toBeTruthy()
})
test('BioNTech; Booster Immunization shortly after vaccination; VALID', () => {
  const dcc = vaccinationDCC()
  dcc.data.payload.hcert.dgc.v![0].dn = 3
  dcc.data.payload.hcert.dgc.v![0].sd = 3

  expect(validate(dcc, moment('2022-01-10').toDate())).toBeTruthy()
})
test('BioNTech; Booster Immunization in one year; VALID', () => {
  const dcc = vaccinationDCC()
  dcc.data.payload.hcert.dgc.v![0].dn = 3
  dcc.data.payload.hcert.dgc.v![0].sd = 3

  expect(validate(dcc, moment('2023-02-15').toDate())).toBeTruthy()
})
test('BioNTech; Booster Immunization after Recovery; VALID', () => {
  const dcc = vaccinationDCC()
  dcc.data.payload.hcert.dgc.v![0].dn = 2
  dcc.data.payload.hcert.dgc.v![0].sd = 1

  expect(validate(dcc, date)).toBeTruthy()
})

/////////////////// J&J ///////////////////
test('J&J; Partial Immunization; INVALID', () => {
  const dcc = vaccinationDCC()
  dcc.data.payload.hcert.dgc.v![0].mp = 'EU/1/20/1525'
  dcc.data.payload.hcert.dgc.v![0].dn = 1
  dcc.data.payload.hcert.dgc.v![0].sd = 1

  expect(validate(dcc, date)).toBeFalsy()
})
test('J&J; Full Immunization; VALID', () => {
  const dcc = vaccinationDCC()
  dcc.data.payload.hcert.dgc.v![0].mp = 'EU/1/20/1525'
  dcc.data.payload.hcert.dgc.v![0].dn = 2
  dcc.data.payload.hcert.dgc.v![0].sd = 2

  expect(validate(dcc, date)).toBeTruthy()
})
test('J&J; Booster Immunization; VALID', () => {
  const dcc = vaccinationDCC()
  dcc.data.payload.hcert.dgc.v![0].mp = 'EU/1/20/1525'
  dcc.data.payload.hcert.dgc.v![0].dn = 3
  dcc.data.payload.hcert.dgc.v![0].sd = 3

  expect(validate(dcc, date)).toBeTruthy()
})
test('J&J; Booster Immunization after Recovery; VALID', () => {
  const dcc = vaccinationDCC()
  dcc.data.payload.hcert.dgc.v![0].mp = 'EU/1/20/1525'
  dcc.data.payload.hcert.dgc.v![0].dn = 2
  dcc.data.payload.hcert.dgc.v![0].sd = 1

  expect(validate(dcc, date)).toBeTruthy()
})

/////////////////// Special Cases ///////////////////
test('Special; Full Immunization with unregistered mp; INVALID', () => {
  const dcc = vaccinationDCC()
  dcc.data.payload.hcert.dgc.v![0].mp = 'the-special-stuff'
  dcc.data.payload.hcert.dgc.v![0].dn = 2
  dcc.data.payload.hcert.dgc.v![0].sd = 2

  expect(validate(dcc, date)).toBeFalsy()
})

/////////////////// Recovery ///////////////////
test('Recovery after 10 days; INVALID', () => {
  expect(validate(recoveryDCC(), moment('2022-01-20').toDate())).toBeFalsy()
})
test('Recovery after 30 days; VALID', () => {
  expect(validate(recoveryDCC(), moment('2022-02-09').toDate())).toBeTruthy()
})
test('Recovery after 90 days; INVALID', () => {
  expect(validate(recoveryDCC(), moment('2022-07-19').toDate())).toBeFalsy()
})

/////////////////// Test ///////////////////
test('Antigen after 10 hours; VALID', () => {
  const dcc = testDCC()
  dcc.data.payload.hcert.dgc.t![0].tr = TEST_NEGATIVE

  expect(validate(dcc, date)).toBeTruthy()
})
test('Antigen after 30 hours; INVALID', () => {
  const dcc = testDCC()
  dcc.data.payload.hcert.dgc.t![0].tr = TEST_NEGATIVE

  expect(validate(dcc, moment('2022-02-16T16:00:00Z').toDate())).toBeFalsy()
})
test('Positive Antigen; INVALID', () => {
  const dcc = testDCC()
  dcc.data.payload.hcert.dgc.t![0].tr = TEST_POSITIVE

  expect(validate(dcc, date)).toBeFalsy()
})
test('PCR after 10 hours; VALID', () => {
  const dcc = testDCC()
  dcc.data.payload.hcert.dgc.t![0].tt = 'LP6464-4'
  dcc.data.payload.hcert.dgc.t![0].tr = TEST_NEGATIVE

  expect(validate(dcc, date)).toBeTruthy()
})
test('PCR after 80 hours; INVALID', () => {
  const dcc = testDCC()
  dcc.data.payload.hcert.dgc.t![0].tt = 'LP6464-4'
  dcc.data.payload.hcert.dgc.t![0].tr = TEST_NEGATIVE

  expect(validate(dcc, moment('2022-02-18T18:00:00Z').toDate())).toBeFalsy()
})
test('Positive PCR less than 28 days; INVALID', () => {
  const dcc = testDCC()
  dcc.data.payload.hcert.dgc.t![0].tt = 'LP6464-4'
  dcc.data.payload.hcert.dgc.t![0].tr = TEST_POSITIVE

  expect(validate(dcc, date)).toBeFalsy()
})
test('Positive PCR between 28 and 90 days; Recoverd; VALID', () => {
  const dcc = testDCC()
  dcc.data.payload.hcert.dgc.t![0].tt = 'LP6464-4'
  dcc.data.payload.hcert.dgc.t![0].tr = TEST_POSITIVE

  expect(validate(dcc, moment('2022-03-17').toDate())).toBeTruthy()
})
test('Positive PCR after 90 days; INVALID', () => {
  const dcc = testDCC()
  dcc.data.payload.hcert.dgc.t![0].tt = 'LP6464-4'
  dcc.data.payload.hcert.dgc.t![0].tr = TEST_POSITIVE

  expect(validate(dcc, moment('2022-08-15').toDate())).toBeFalsy()
})
test('Unknown Test after 10 hours; INVALID', () => {
  const dcc = testDCC()
  dcc.data.payload.hcert.dgc.t![0].tt = 'taste-test'
  dcc.data.payload.hcert.dgc.t![0].tr = TEST_NEGATIVE

  expect(validate(dcc, date)).toBeFalsy()
})

export {}
