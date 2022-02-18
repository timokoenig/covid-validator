import { Box, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { JSONObject } from '../../../utils/builder/types'
import BuilderStack from '../stack'

const EmptyComponent = () => {
  // const [data, setData] = useState<JSONObject>({
  //   if: [{ var: 'payload.0.1.2' }, { if: [{ var: 'payload.0.1.2' }, false, false] }, false],
  // })
  // const [data, setData] = useState<JSONObject>({
  //   type: 'certificate-type',
  //   if: [
  //     { var: 'payload.v.0' },
  //     {
  //       and: [{ var: 'payload.0.1.2' }, { var: 'payload.0.1.2' }, true, false, 'hellp'],
  //     },
  //     false,
  //   ],
  // })
  const [data, setData] = useState<JSONObject>({
    if: [
      {
        var: 'payload.v.0',
      },
      {
        if: [
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
                  15,
                  'day',
                ],
              },
            ],
          },
          true,
          {
            if: [
              {
                '>': [
                  {
                    var: 'payload.v.0.dn',
                  },
                  2,
                ],
              },
              true,
              {
                if: [
                  {
                    and: [
                      {
                        '>': [
                          {
                            var: 'payload.v.0.dn',
                          },
                          1,
                        ],
                      },
                      {
                        '===': [
                          {
                            var: 'payload.v.0.mp',
                          },
                          'EU/1/20/1525',
                        ],
                      },
                    ],
                  },
                  true,
                  {
                    and: [
                      {
                        and: [
                          {
                            '===': [
                              {
                                var: 'payload.v.0.sd',
                              },
                              1,
                            ],
                          },
                          {
                            '===': [
                              {
                                var: 'payload.v.0.dn',
                              },
                              1,
                            ],
                          },
                        ],
                      },
                      {
                        in: [
                          {
                            var: 'payload.v.0.mp',
                          },
                          ['EU/1/20/1528', 'EU/1/20/1507', 'EU/1/21/1529'],
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      true,
    ],
  })
  const { t } = useTranslation('common')
  return (
    <Box flex="1" px="10" py="5" display="flex" flexDirection="column" overflow="scroll">
      <Box p="10">
        <Text textAlign="center">{t('builder.placeholder')}</Text>
        <BuilderStack data={data} onChange={setData} />
      </Box>
    </Box>
  )
}

export default EmptyComponent
