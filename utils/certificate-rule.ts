/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CertificateRule, CustomRule, Rule } from './certlogic'

export function encodeCertificateRule(
  customRule: CustomRule,
  certificateRule: CertificateRule
): Rule {
  // certificateRule.type === 'Vaccination'
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
  // at least one must pass to continue

  const logic: any = {
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
            and: [
              /// TODO immunizationRules
              {
                or: activeImmunizationRules,
              },
              /// TODO validFrom
              {
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
              },
              /// TODO validTo
              {
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
              },
            ],
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
      'payload.v.0.dn',
      'payload.v.0.sn',
      'payload.v.0.dt',
    ],
    Logic: logic,
  }
}

// {
//   "if": [
//     {
//       "var": "payload.v.0"
//     },
// {
//   "in": [
//     {
//       "var": "payload.v.0.mp"
//     },
//     [
//       "EU/1/20/1528",
//       "EU/1/20/1507",
//       "EU/1/21/1529",
//       "EU/1/20/1525"
//     ]
//   ]
// },
//     true
//   ]
// }

// {
//   "if": [
//     {
//       "var": "payload.v.0"
//     },
//     {
//       "if": [
// {
//   "not-before": [
//     {
//       "plusTime": [
//         {
//           "var": "external.validationClock"
//         },
//         0,
//         "day"
//       ]
//     },
//     {
//       "plusTime": [
//         {
//           "var": "payload.v.0.dt"
//         },
//         15,
//         "day"
//       ]
//     }
//   ]
// },
//         true,
//         {
//           "if": [
//             {
//               ">": [
//                 {
//                   "var": "payload.v.0.dn"
//                 },
//                 2
//               ]
//             },
//             true,
//             {
//               "if": [
//                 {
//                   "and": [
//                     {
//                       ">": [
//                         {
//                           "var": "payload.v.0.dn"
//                         },
//                         1
//                       ]
//                     },
//                     {
//                       "===": [
//                         {
//                           "var": "payload.v.0.mp"
//                         },
//                         "EU/1/20/1525"
//                       ]
//                     }
//                   ]
//                 },
//                 true,
//                 {
//                   "and": [
//                     {
//                       "and": [
//                         {
//                           "===": [
//                             {
//                               "var": "payload.v.0.sd"
//                             },
//                             1
//                           ]
//                         },
//                         {
//                           "===": [
//                             {
//                               "var": "payload.v.0.dn"
//                             },
//                             1
//                           ]
//                         }
//                       ]
//                     },
//                     {
//                       "in": [
//                         {
//                           "var": "payload.v.0.mp"
//                         },
//                         [
//                           "EU/1/20/1528",
//                           "EU/1/20/1507",
//                           "EU/1/21/1529"
//                         ]
//                       ]
//                     }
//                   ]
//                 }
//               ]
//             }
//           ]
//         }
//       ]
//     },
//     true
//   ]
// }
