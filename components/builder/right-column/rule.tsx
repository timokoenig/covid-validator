import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { CertificateRule, immunizationTypeName } from '../../../utils/certlogic'
import tests from '../../../utils/tests'
import vaccines from '../../../utils/vaccines'

type Props = {
  rule: CertificateRule
  onEdit: () => void
}

const Rule = (props: Props) => {
  const { t } = useTranslation('common')
  return (
    <Box borderRadius="10" backgroundColor="gray.700" padding="5">
      <Flex>
        <Box flex="1" display="flex" flexDireaction="row" alignItems="center">
          <Box>
            <Text>{props.rule.translations.find(trans => trans.lang === 'en')?.desc}</Text>
          </Box>
        </Box>
        <Button colorScheme="blue" onClick={props.onEdit}>
          {t('edit')}
        </Button>
      </Flex>
      <Box my="5">
        <Text fontWeight="semibold">{t('builder.precondition')}</Text>
        <Text>
          {props.rule.type};{' '}
          {props.rule.type === 'Vaccination'
            ? props.rule.medicalProducts
                ?.map(mp => vaccines.find(v => v.id === mp)?.name)
                .join(', ')
            : ''}
          {props.rule.type === 'Test'
            ? props.rule.medicalProducts?.map(mp => tests.find(v => v.id === mp)?.name).join(', ')
            : ''}
        </Text>
      </Box>
      <Box my="5">
        <Text fontWeight="semibold">{t('builder.condition')}</Text>
        {props.rule.type === 'Vaccination' && (
          <Box>
            {props.rule.immunizationStatus && (
              <Text>{immunizationTypeName(props.rule.immunizationStatus)}</Text>
            )}
            {props.rule.validFrom && (
              <Text>
                {t('date')} &gt; {t('vaccinationdate')} + {props.rule.validFrom} {t('days')}
              </Text>
            )}
            {props.rule.validTo && (
              <Text>
                {t('date')} &lt; {t('vaccinationdate')} + {props.rule.validTo} {t('days')}
              </Text>
            )}
          </Box>
        )}
        {props.rule.type === 'Test' && (
          <Box>
            {props.rule.validFrom && (
              <Text>
                {t('date')} &gt; {t('samplecollectiondate')} + {props.rule.validFrom} {t('hours')}
              </Text>
            )}
            {props.rule.validTo && (
              <Text>
                {t('date')} &lt; {t('samplecollectiondate')} + {props.rule.validTo} {t('hours')}
              </Text>
            )}
          </Box>
        )}
        {props.rule.type === 'Recovery' && (
          <Box>
            {props.rule.validFrom && (
              <Text>
                {t('date')} &gt; {t('positivepcrdate')} + {props.rule.validFrom} {t('days')}
              </Text>
            )}
            {props.rule.validTo && (
              <Text>
                {t('date')} &lt; {t('positivepcrdate')} + {props.rule.validTo} {t('days')}
              </Text>
            )}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Rule
