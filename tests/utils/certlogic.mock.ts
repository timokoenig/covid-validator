import { DCCRuleValidationResult, ICertLogic, ICertLogicConfig, Rule } from '../../utils/certlogic'

class DebugConfig implements ICertLogicConfig {
  country(): string {
    return 'DE'
  }
  state(): string {
    return 'HH'
  }
}

export class CertLogicMock implements ICertLogic {
  config: ICertLogicConfig = new DebugConfig()
  validateDCCResult: DCCRuleValidationResult
  validateImmunizationRulesResult: string | null
  validateRecoveryRulesResult: boolean

  constructor(data: {
    validateDCCResult?: DCCRuleValidationResult
    validateImmunizationRulesResult?: string | null
    validateRecoveryRulesResult?: boolean
  }) {
    this.validateDCCResult =
      data.validateDCCResult === undefined
        ? {
            results: [
              {
                rule: {
                  Identifier: '1',
                  Type: 'Acceptance',
                  Country: 'DE',
                  Version: '1.0.0',
                  SchemaVersion: '1.0.0',
                  Engine: 'CERTLOGIC',
                  EngineVersion: '0.7.5',
                  CertificateType: 'Vaccination',
                  Description: [],
                  ValidFrom: '2022-01-01T00:00:00Z',
                  ValidTo: '2023-01-01T00:00:00Z',
                  AffectedFields: [],
                  Logic: true,
                },
                valid: false,
              },
            ],
            isValid: false,
          }
        : data.validateDCCResult
    this.validateImmunizationRulesResult = data.validateImmunizationRulesResult ?? null
    this.validateRecoveryRulesResult = data.validateRecoveryRulesResult ?? false
  }

  currentAcceptanceRules(): Rule[] {
    return []
  }

  acceptanceRules(): Rule[] {
    return []
  }

  validateDCC(): DCCRuleValidationResult {
    return this.validateDCCResult
  }

  validateImmunizationRules(): string | null {
    return this.validateImmunizationRulesResult
  }

  validateRecoveryRules(): boolean {
    return this.validateRecoveryRulesResult
  }
}
