import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { CertificateRule, immunizationTypeName } from '../../utils/certlogic'
import tests from '../../utils/tests'
import vaccines from '../../utils/vaccines'

type Props = {
  rule: CertificateRule
  onEdit: () => void
}

const Rule = (props: Props) => {
  return (
    <Box borderRadius="10" backgroundColor="gray.700" padding="5">
      <Flex>
        <Box flex="1" display="flex" flexDireaction="row" alignItems="center">
          <Box>
            <Text>{props.rule.translations.find(t => t.lang === 'en')?.desc}</Text>
          </Box>
        </Box>
        <Button colorScheme="blue" onClick={props.onEdit}>
          Edit
        </Button>
      </Flex>
      <Box my="5">
        <Text fontWeight="semibold">Pre-Condition (when a rule should be checked)</Text>
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
        <Text fontWeight="semibold">Condition (what should be checked)</Text>
        {props.rule.type === 'Vaccination' && (
          <Box>
            {props.rule.immunizationStatus && (
              <Text>{immunizationTypeName(props.rule.immunizationStatus)}</Text>
            )}
            {props.rule.validFrom && (
              <Text>Date &gt; VaccinationDate + {props.rule.validFrom} days</Text>
            )}
            {props.rule.validTo && (
              <Text>Date &lt; VaccinationDate + {props.rule.validTo} days</Text>
            )}
          </Box>
        )}
        {props.rule.type === 'Test' && (
          <Box>
            {props.rule.validFrom && (
              <Text>Date &gt; SampleCollection + {props.rule.validFrom} hours</Text>
            )}
            {props.rule.validTo && (
              <Text>Date &lt; SampleCollection + {props.rule.validTo} hours</Text>
            )}
          </Box>
        )}
      </Box>
      <Box my="5">
        <Text fontWeight="semibold">Result</Text>
        <Text>{props.rule.result ? 'VALID' : 'INVALID'}</Text>
      </Box>
    </Box>
  )
}

export default Rule
