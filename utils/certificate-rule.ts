/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CertificateRule, CustomRule, Rule } from './certlogic'

export function encodeCertificateRule(
  customRule: CustomRule,
  certificateRule: CertificateRule
): Rule | null {
  if (certificateRule.type === 'Vaccination') {
    const immunizationRules = customRule.immunizationRules.filter(
      rule => rule.type === certificateRule.immunizationStatus
    )
    const activeImmunizationRules = [
      ...new Set(
        certificateRule.medicalProducts
          ?.map(mp => immunizationRules.filter(rule => rule.medicalProducts.includes(mp)))
          .flat(1)
      ),
    ].map(rule => rule.rule)

    const conditions: any[] = [
      {
        or: activeImmunizationRules,
      },
    ]
    if (certificateRule.validFrom) {
      conditions.push({
        'not-before': [
          {
            plusTime: [
              {
                var: 'external.validationClock',
              },
              0,
              'day',
            ],
          },
          {
            plusTime: [
              {
                var: 'payload.v.0.dt',
              },
              certificateRule.validFrom,
              'day',
            ],
          },
        ],
      })
    }
    if (certificateRule.validTo) {
      conditions.push({
        'not-after': [
          {
            plusTime: [
              {
                var: 'external.validationClock',
              },
              0,
              'day',
            ],
          },
          {
            plusTime: [
              {
                var: 'payload.v.0.dt',
              },
              certificateRule.validTo,
              'day',
            ],
          },
        ],
      })
    }

    return {
      Identifier: certificateRule.id,
      Type: 'Acceptance',
      Country: 'DE',
      Version: '1.0.0',
      SchemaVersion: '1.0.0',
      Engine: 'CERTLOGIC',
      EngineVersion: '0.7.5',
      CertificateType: certificateRule.type,
      Description: certificateRule.translations,
      ValidFrom: '2022-01-01T00:00:00Z',
      ValidTo: '2023-01-01T00:00:00Z',
      AffectedFields: [
        'payload.v.0',
        'payload.v.0.mp',
        'payload.v.0.dt',
        'payload.v.0.dn',
        'payload.v.0.sn',
      ],
      Logic: {
        if: [
          // precondition
          {
            and: [
              { var: 'payload.v.0' },
              {
                in: [
                  {
                    var: 'payload.v.0.mp',
                  },
                  certificateRule.medicalProducts,
                ],
              },
            ],
          },
          // condition
          {
            if: [
              {
                and: conditions,
              },
              // if condition is true, we return the certificates result type
              certificateRule.result,
              // if condition is false, we return false
              false,
            ],
          },
          // otherwise return true
          true,
        ],
      },
    }
  }

  if (certificateRule.type === 'Test') {
    const conditions: any[] = [
      // negative result
      {
        '===': [
          {
            var: 'payload.t.0.tr',
          },
          '260415000',
        ],
      },
    ]
    if (certificateRule.validFrom) {
      conditions.push({
        'not-before': [
          {
            plusTime: [
              {
                var: 'external.validationClock',
              },
              0,
              'hour',
            ],
          },
          {
            plusTime: [
              {
                var: 'payload.t.0.sc',
              },
              certificateRule.validFrom,
              'hour',
            ],
          },
        ],
      })
    }
    if (certificateRule.validTo) {
      conditions.push({
        'not-after': [
          {
            plusTime: [
              {
                var: 'external.validationClock',
              },
              0,
              'hour',
            ],
          },
          {
            plusTime: [
              {
                var: 'payload.t.0.sc',
              },
              certificateRule.validTo,
              'hour',
            ],
          },
        ],
      })
    }
    return {
      Identifier: certificateRule.id,
      Type: 'Acceptance',
      Country: 'DE',
      Version: '1.0.0',
      SchemaVersion: '1.0.0',
      Engine: 'CERTLOGIC',
      EngineVersion: '0.7.5',
      CertificateType: certificateRule.type,
      Description: certificateRule.translations,
      ValidFrom: '2022-01-01T00:00:00Z',
      ValidTo: '2023-01-01T00:00:00Z',
      AffectedFields: ['payload.t.0', 'payload.t.0.tt', 'payload.t.0.tr', 'payload.t.0.sc'],
      Logic: {
        if: [
          // precondition
          {
            and: [
              { var: 'payload.t.0' },
              {
                in: [
                  {
                    var: 'payload.t.0.tt',
                  },
                  certificateRule.medicalProducts,
                ],
              },
            ],
          },
          // condition
          {
            if: [
              {
                and: conditions,
              },
              // if condition is true, we return the certificates result type
              certificateRule.result,
              // if condition is false, we return false
              false,
            ],
          },
          // otherwise return true
          true,
        ],
      },
    }
  }

  if (certificateRule.type === 'Recovery') {
    const conditions: any[] = []
    if (certificateRule.validFrom) {
      conditions.push({
        'not-before': [
          {
            plusTime: [
              {
                var: 'external.validationClock',
              },
              0,
              'day',
            ],
          },
          {
            plusTime: [
              {
                var: 'payload.r.0.fr',
              },
              certificateRule.validFrom,
              'day',
            ],
          },
        ],
      })
    }
    if (certificateRule.validTo) {
      conditions.push({
        'not-after': [
          {
            plusTime: [
              {
                var: 'external.validationClock',
              },
              0,
              'day',
            ],
          },
          {
            plusTime: [
              {
                var: 'payload.r.0.fr',
              },
              certificateRule.validTo,
              'day',
            ],
          },
        ],
      })
    }
    return {
      Identifier: certificateRule.id,
      Type: 'Acceptance',
      Country: 'DE',
      Version: '1.0.0',
      SchemaVersion: '1.0.0',
      Engine: 'CERTLOGIC',
      EngineVersion: '0.7.5',
      CertificateType: certificateRule.type,
      Description: certificateRule.translations,
      ValidFrom: '2022-01-01T00:00:00Z',
      ValidTo: '2023-01-01T00:00:00Z',
      AffectedFields: ['payload.r.0', 'payload.r.0.fr'],
      Logic: {
        if: [
          // precondition
          { var: 'payload.r.0' },
          // condition
          {
            if: [
              {
                and: conditions,
              },
              // if condition is true, we return the certificates result type
              certificateRule.result,
              // if condition is false, we return false
              false,
            ],
          },
          // otherwise return true
          true,
        ],
      },
    }
  }

  return null
}
