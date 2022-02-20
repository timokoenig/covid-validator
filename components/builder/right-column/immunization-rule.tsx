import { Box, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import vaccines from '~/utils/vaccines'
import { ImmunizationRule, immunizationTypeName } from '../../../utils/certlogic'

type Props = {
  rule: ImmunizationRule
  onEdit: () => void
}

const ImmunizationRuleComponent = (props: Props) => {
  const { t } = useTranslation('common')
  return (
    <Box borderRadius="10" backgroundColor={useColorModeValue('gray.200', 'gray.700')} padding="5">
      <Flex>
        <Box flex="1" display="flex" flexDireaction="row" alignItems="center">
          <Box>
            <Text fontWeight="semibold">{immunizationTypeName(props.rule.type)}</Text>
            <Text>
              {props.rule.medicalProducts
                .map(mp => vaccines.find(vac => vac.id === mp)?.name ?? mp)
                .join(', ')}
            </Text>
          </Box>
        </Box>
        <Button colorScheme="blue" onClick={props.onEdit}>
          {t('edit')}
        </Button>
      </Flex>
    </Box>
  )
}

export default ImmunizationRuleComponent
