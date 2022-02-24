/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-implicit-any-catch */
import dscDemoListJson from '../data/dsc-demo.json'
import {
  CERTIFICATE_TYPE_RECOVERY,
  CERTIFICATE_TYPE_TEST,
  CERTIFICATE_TYPE_VACCINATION,
  IMMUNIZATION_STATUS_BOOSTER,
} from '../utils/builder/types'
import {
  DCCExpiredError,
  DCCNoValidationError,
  DCCPurposeError,
  DCCScanner,
  DCCValidationError,
  DCCVerifyError,
  DSC,
  IDCCScannerConfig,
} from '../utils/dcc-scanner'
import { CertLogicMock } from './certlogic.mock'
import { recoveryDCC, testDCC, vaccinationDCC } from './helpers'

class DebugConfig implements IDCCScannerConfig {
  dDscList: DSC[] | null
  dCountry: string
  dState: string
  dPurpose: string

  constructor(data: {
    dscList?: DSC[] | null
    country?: string
    state?: string
    purpose?: string
  }) {
    this.dDscList =
      data.dscList === null
        ? null
        : data.dscList ??
          (
            dscDemoListJson as {
              certificates: DSC[]
            }
          ).certificates
    this.dCountry = data.country ?? 'DE'
    this.dState = data.state ?? 'HH'
    this.dPurpose = data.purpose ?? '3G'
  }

  dscList(): DSC[] | null {
    return this.dDscList
  }
  country(): string {
    return this.dCountry
  }
  state(): string {
    return this.dState
  }
  purpose(): string {
    return this.dPurpose
  }
  validationClock(): Date {
    return new Date()
  }
}

/// Tests
/////////////////// Purpose ///////////////////
test('Purpose: 1G; Vaccination; VALID', () => {
  const sut = new DCCScanner(new DebugConfig({ purpose: '1G' }))
  const res = sut.validateDCCPurpose(vaccinationDCC())
  expect(res).toBeTruthy()
})
test('Purpose: 1G; Test; INVALID', () => {
  const sut = new DCCScanner(new DebugConfig({ purpose: '1G' }))
  const res = sut.validateDCCPurpose(testDCC())
  expect(res).toBeFalsy()
})
test('Purpose: 1G; Recovery; INVALID', () => {
  const sut = new DCCScanner(new DebugConfig({ purpose: '1G' }))
  const res = sut.validateDCCPurpose(recoveryDCC())
  expect(res).toBeFalsy()
})
test('Purpose: 1G+; Vaccination; VALID', () => {
  const sut = new DCCScanner(new DebugConfig({ purpose: '1G+' }))
  const res = sut.validateDCCPurpose(vaccinationDCC())
  expect(res).toBeTruthy()
})
test('Purpose: 1G+; Test; VALID', () => {
  const sut = new DCCScanner(new DebugConfig({ purpose: '1G+' }))
  const res = sut.validateDCCPurpose(testDCC())
  expect(res).toBeTruthy()
})
test('Purpose: 1G+; Recovery; INVALID', () => {
  const sut = new DCCScanner(new DebugConfig({ purpose: '1G+' }))
  const res = sut.validateDCCPurpose(recoveryDCC())
  expect(res).toBeFalsy()
})
test('Purpose: 2G; Vaccination; VALID', () => {
  const sut = new DCCScanner(new DebugConfig({ purpose: '2G' }))
  const res = sut.validateDCCPurpose(vaccinationDCC())
  expect(res).toBeTruthy()
})
test('Purpose: 2G; Test; INVALID', () => {
  const sut = new DCCScanner(new DebugConfig({ purpose: '2G' }))
  const res = sut.validateDCCPurpose(testDCC())
  expect(res).toBeFalsy()
})
test('Purpose: 2G; Recovery; VALID', () => {
  const sut = new DCCScanner(new DebugConfig({ purpose: '2G' }))
  const res = sut.validateDCCPurpose(recoveryDCC())
  expect(res).toBeTruthy()
})
test('Purpose: 2G+; Vaccination; VALID', () => {
  const sut = new DCCScanner(new DebugConfig({ purpose: '2G+' }))
  const res = sut.validateDCCPurpose(vaccinationDCC())
  expect(res).toBeTruthy()
})
test('Purpose: 2G+; Test; VALID', () => {
  const sut = new DCCScanner(new DebugConfig({ purpose: '2G+' }))
  const res = sut.validateDCCPurpose(testDCC())
  expect(res).toBeTruthy()
})
test('Purpose: 2G+; Recovery; VALID', () => {
  const sut = new DCCScanner(new DebugConfig({ purpose: '2G+' }))
  const res = sut.validateDCCPurpose(recoveryDCC())
  expect(res).toBeTruthy()
})
test('Purpose: 3G; Vaccination; VALID', () => {
  const sut = new DCCScanner(new DebugConfig({ purpose: '3G' }))
  const res = sut.validateDCCPurpose(vaccinationDCC())
  expect(res).toBeTruthy()
})
test('Purpose: 3G; Test; VALID', () => {
  const sut = new DCCScanner(new DebugConfig({ purpose: '3G' }))
  const res = sut.validateDCCPurpose(testDCC())
  expect(res).toBeTruthy()
})
test('Purpose: 3G; Recovery; VALID', () => {
  const sut = new DCCScanner(new DebugConfig({ purpose: '3G' }))
  const res = sut.validateDCCPurpose(recoveryDCC())
  expect(res).toBeTruthy()
})

/////////////////// Clear ///////////////////
test('Clear should remove all certificates', () => {
  const sut = new DCCScanner(new DebugConfig({}))
  sut.certificates = [vaccinationDCC()]
  sut.clear()
  expect(sut.certificates.length).toEqual(0)
})

/////////////////// Scan ///////////////////
// TODO disabled because of performance reasons; will fix it soon
// test('Scan valid DCC; VALID', async () => {
//   const sut = new DCCScanner(new DebugConfig({}))
//   await sut.scan(
//     'HC1:6BFOXN*TS0BI$ZD4N9:9S6RCVN5+O30K3/XIV0W23NTDE$VK G2EP4J0B3KL6QM5/OVGA/MAT%ISA3/-2E%5VR5VVBJZILDBZ8D%JTQOLC8CZ8DVCK/8D:8DQVDLED0AC-BU6SS-.DUBDNU347D8MS$ESFHDO8TF724QSHA2YR3JZIM-1U96UX4795L*KDYPWGO+9A*DOPCRFE4IWM:J8QHL9/5.+M1:6G16PCNQ+MLTMU0BR3UR:J.X0A%QXBKQ+8E/C5LG/69+FEKHG4.C/.DV2MGDIE-5QHCYQCJB4IE9WT0K3M9UVZSVK78Y9J8.P++9-G9+E93ZM$96TV6KJ73T59YLQM14+OP$I/XK$M8AO96YBDAKZ%P WUQRELS4J1T7OFKCT6:I /K/*KRZ43R4+*431TVZK WVR*GNS42J0+-9*+7E3KF%CD 810H% 0NY0H$1AVL9%7L26Y1NZ1WNZBPCG*7L%5G.%M/4GNIRDBE6J7DFUPSKX.MLEF8/72SEPKD++I*5FMHD*ZBJDBFKEG2GXTL6%7K7GK7QQ1C3H0A/LGIH'
//   )
//   expect(sut.certificates.length).toEqual(1)
// })

// /////////////////// Check ///////////////////
// TODO disabled because of performance reasons; will fix it soon
// test('Check valid DCC; VALID', async () => {
//   const sut = new DCCScanner(new DebugConfig({}))
//   const dcc = vaccinationDCC()
//   try {
//     await sut.check(dcc)
//     expect(sut.certificates.length).toEqual(1)
//   } catch (e) {
//     expect(e).toBeUndefined()
//   }
// })

test('Check expired DCC; INVALID', async () => {
  const sut = new DCCScanner(new DebugConfig({ dscList: null }))
  const dcc = vaccinationDCC()
  dcc.data.payload.exp = '0'

  await expect(sut.check(dcc)).rejects.toThrowError(DCCExpiredError)
})

test('Check DCC signed by third-party; INVALID', async () => {
  const sut = new DCCScanner(new DebugConfig({ dscList: [] }))
  const dcc = vaccinationDCC()

  await expect(sut.check(dcc)).rejects.toThrowError(DCCVerifyError)
})

test('Check DCC with no validation rules; INVALID', async () => {
  const certLogic = new CertLogicMock({})
  certLogic.validateDCCResult.results = []
  const sut = new DCCScanner(new DebugConfig({ dscList: null }), certLogic)
  const dcc = vaccinationDCC()

  await expect(sut.check(dcc)).rejects.toThrowError(DCCNoValidationError)
})

test('Check DCC with failed validation; INVALID', async () => {
  const certLogic = new CertLogicMock({})
  certLogic.validateDCCResult.isValid = false
  const sut = new DCCScanner(new DebugConfig({ dscList: null }), certLogic)
  const dcc = vaccinationDCC()

  await expect(sut.check(dcc)).rejects.toThrowError(DCCValidationError)
})

test('Check Test DCC with 1G; INVALID', async () => {
  const certLogic = new CertLogicMock({})
  certLogic.validateDCCResult.isValid = true
  const sut = new DCCScanner(new DebugConfig({ dscList: null, purpose: '1G' }), certLogic)
  const dcc = testDCC()
  dcc.data.payload.hcert.dgc.t![0].sc = new Date().toISOString()

  await expect(sut.check(dcc)).rejects.toThrowError(DCCPurposeError)
})

/////////////////// Multiscan ///////////////////

test('Multiscan VAC 3G', async () => {
  const certLogic = new CertLogicMock({})
  const sut = new DCCScanner(new DebugConfig({ purpose: '3G' }), certLogic)
  sut.certificates = [vaccinationDCC()]

  expect(sut.isMultiScanNecessary()).toMatchObject([])
})

test('Multiscan REC 3G', async () => {
  const certLogic = new CertLogicMock({})
  const sut = new DCCScanner(new DebugConfig({ purpose: '3G' }), certLogic)
  sut.certificates = [recoveryDCC()]

  expect(sut.isMultiScanNecessary()).toMatchObject([])
})

test('Multiscan TES 3G', async () => {
  const certLogic = new CertLogicMock({})
  const sut = new DCCScanner(new DebugConfig({ purpose: '3G' }), certLogic)
  sut.certificates = [testDCC()]

  expect(sut.isMultiScanNecessary()).toMatchObject([])
})

test('Multiscan VAC 2G+', async () => {
  const certLogic = new CertLogicMock({})
  const sut = new DCCScanner(new DebugConfig({ purpose: '2G+' }), certLogic)
  sut.certificates = [vaccinationDCC()]

  expect(sut.isMultiScanNecessary()).toMatchObject([CERTIFICATE_TYPE_TEST])
})

test('Multiscan VAC BOOSTER 2G+', async () => {
  const certLogic = new CertLogicMock({
    validateImmunizationRulesResult: IMMUNIZATION_STATUS_BOOSTER,
  })
  const sut = new DCCScanner(new DebugConfig({ purpose: '2G+' }), certLogic)
  sut.certificates = [vaccinationDCC()]

  expect(sut.isMultiScanNecessary()).toMatchObject([])
})

test('Multiscan REC 2G+', async () => {
  const certLogic = new CertLogicMock({})
  const sut = new DCCScanner(new DebugConfig({ purpose: '2G+' }), certLogic)
  sut.certificates = [recoveryDCC()]

  expect(sut.isMultiScanNecessary()).toMatchObject([CERTIFICATE_TYPE_TEST])
})

test('Multiscan TES 2G+', async () => {
  const certLogic = new CertLogicMock({})
  const sut = new DCCScanner(new DebugConfig({ purpose: '2G+' }), certLogic)
  sut.certificates = [testDCC()]

  expect(sut.isMultiScanNecessary()).toMatchObject([
    CERTIFICATE_TYPE_VACCINATION,
    CERTIFICATE_TYPE_RECOVERY,
  ])
})

test('Multiscan TES RECOVERY 2G+', async () => {
  const certLogic = new CertLogicMock({
    validateRecoveryRulesResult: true,
  })
  const sut = new DCCScanner(new DebugConfig({ purpose: '2G+' }), certLogic)
  sut.certificates = [testDCC()]

  expect(sut.isMultiScanNecessary()).toMatchObject([CERTIFICATE_TYPE_TEST])
})

test('Multiscan VAC 2G', async () => {
  const certLogic = new CertLogicMock({})
  const sut = new DCCScanner(new DebugConfig({ purpose: '2G' }), certLogic)
  sut.certificates = [vaccinationDCC()]

  expect(sut.isMultiScanNecessary()).toMatchObject([])
})

test('Multiscan REC 2G', async () => {
  const certLogic = new CertLogicMock({})
  const sut = new DCCScanner(new DebugConfig({ purpose: '2G' }), certLogic)
  sut.certificates = [recoveryDCC()]

  expect(sut.isMultiScanNecessary()).toMatchObject([])
})

test('Multiscan TES 2G', async () => {
  const certLogic = new CertLogicMock({})
  const sut = new DCCScanner(new DebugConfig({ purpose: '2G' }), certLogic)
  sut.certificates = [testDCC()]

  expect(sut.isMultiScanNecessary()).toMatchObject([])
})

test('Multiscan TES RECOVERY 2G', async () => {
  const certLogic = new CertLogicMock({
    validateRecoveryRulesResult: true,
  })
  const sut = new DCCScanner(new DebugConfig({ purpose: '2G' }), certLogic)
  sut.certificates = [testDCC()]

  expect(sut.isMultiScanNecessary()).toMatchObject([])
})

test('Multiscan VAC 1G+', async () => {
  const certLogic = new CertLogicMock({})
  const sut = new DCCScanner(new DebugConfig({ purpose: '1G+' }), certLogic)
  sut.certificates = [vaccinationDCC()]

  expect(sut.isMultiScanNecessary()).toMatchObject([CERTIFICATE_TYPE_TEST])
})

test('Multiscan VAC BOOSTER 1G+', async () => {
  const certLogic = new CertLogicMock({
    validateImmunizationRulesResult: IMMUNIZATION_STATUS_BOOSTER,
  })
  const sut = new DCCScanner(new DebugConfig({ purpose: '1G+' }), certLogic)
  sut.certificates = [vaccinationDCC()]

  expect(sut.isMultiScanNecessary()).toMatchObject([])
})

test('Multiscan REC 1G+', async () => {
  const certLogic = new CertLogicMock({})
  const sut = new DCCScanner(new DebugConfig({ purpose: '1G+' }), certLogic)
  sut.certificates = [recoveryDCC()]

  expect(sut.isMultiScanNecessary()).toMatchObject([])
})

test('Multiscan TES 1G+', async () => {
  const certLogic = new CertLogicMock({})
  const sut = new DCCScanner(new DebugConfig({ purpose: '1G+' }), certLogic)
  sut.certificates = [testDCC()]

  expect(sut.isMultiScanNecessary()).toMatchObject([CERTIFICATE_TYPE_VACCINATION])
})

test('Multiscan TES RECOVERY 1G+', async () => {
  const certLogic = new CertLogicMock({
    validateRecoveryRulesResult: true,
  })
  const sut = new DCCScanner(new DebugConfig({ purpose: '1G+' }), certLogic)
  sut.certificates = [testDCC()]

  expect(sut.isMultiScanNecessary()).toMatchObject([])
})

test('Multiscan VAC 1G', async () => {
  const certLogic = new CertLogicMock({})
  const sut = new DCCScanner(new DebugConfig({ purpose: '1G' }), certLogic)
  sut.certificates = [vaccinationDCC()]

  expect(sut.isMultiScanNecessary()).toMatchObject([])
})

test('Multiscan REC 1G', async () => {
  const certLogic = new CertLogicMock({})
  const sut = new DCCScanner(new DebugConfig({ purpose: '1G' }), certLogic)
  sut.certificates = [recoveryDCC()]

  expect(sut.isMultiScanNecessary()).toMatchObject([])
})

test('Multiscan TES 1G', async () => {
  const certLogic = new CertLogicMock({})
  const sut = new DCCScanner(new DebugConfig({ purpose: '1G' }), certLogic)
  sut.certificates = [testDCC()]

  expect(sut.isMultiScanNecessary()).toMatchObject([])
})

test('Multiscan TES RECOVERY 1G', async () => {
  const certLogic = new CertLogicMock({
    validateRecoveryRulesResult: true,
  })
  const sut = new DCCScanner(new DebugConfig({ purpose: '1G' }), certLogic)
  sut.certificates = [testDCC()]

  expect(sut.isMultiScanNecessary()).toMatchObject([])
})

export {}
