import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { CertificateRule, CustomRule, immunizationTypeName } from '../../../utils/certlogic'
import { decodeImmunizationRule } from '../../../utils/immunization-rule'
import vaccines from '../../../utils/vaccines'
import WizardModal from '../modal/wizard'
import RuleComponent from './rule'

type Props = {
  customRule: CustomRule
  onChange: (customRule: CustomRule) => void
  onEdit: () => void
  onEditCertificateRule: (rule: CertificateRule) => void
  onEditImmunizationRules: () => void
}

const Overview = (props: Props) => {
  const { t } = useTranslation('common')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onAddRule = (rule: CertificateRule) => {
    onClose()
    props.onEditCertificateRule(rule)
  }

  return (
    <>
      <Box flex="1" px="10" py="5" display="flex" flexDirection="column" overflow="scroll">
        <Box display="flex" flexDirection="row" mb="5">
          <Heading flex="1">{props.customRule.name}</Heading>
          <Button colorScheme="blue" onClick={props.onEdit}>
            {t('edit')}
          </Button>
        </Box>
        {props.customRule.description !== '' && <Text mb="5">{props.customRule.description}</Text>}
        <Box backgroundColor="gray.700" borderRadius="5" mb="10">
          <Box display="flex" alignItems="center" flexDirection="row" m="5">
            <Text flex="1" fontWeight="semibold">
              {t('builder.rules.immunization')}
            </Text>
            <Button size="sm" onClick={props.onEditImmunizationRules}>
              {t('edit')}
            </Button>
          </Box>
          <Table size="sm" mx="1" mb="5">
            <Thead>
              <Tr>
                <Th>{t('vaccine')}</Th>
                <Th>{t('builder.rules.dose')}</Th>
                <Th>{t('type')}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {props.customRule.immunizationRules.map(rule => {
                const decodedRule = decodeImmunizationRule(rule.rule)
                const logic = `${decodedRule.dn} ${decodedRule.symbol} ${decodedRule.sd}`
                return (
                  <Tr key={rule.id}>
                    <Td>
                      {rule.medicalProducts.map(mp => (
                        <Text key={mp}>{vaccines.find(vac => vac.id === mp)?.name}</Text>
                      ))}
                    </Td>
                    <Td>{logic}</Td>
                    <Td>{immunizationTypeName(rule.type)}</Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </Box>
        <Box display="flex" alignItems="center" flexDirection="row" mb="5">
          <Text flex="1" fontWeight="semibold">
            {t('builder.rules.certificate')}
          </Text>
          <Button colorScheme="blue" onClick={onOpen}>
            {t('add')}
          </Button>
        </Box>
        <SimpleGrid mb="5" spacing="5">
          {props.customRule.rules.length === 0 && <Text>{t('builder.rules.empty')}</Text>}
          {props.customRule.rules.map(rule => (
            <RuleComponent
              key={rule.id}
              rule={rule}
              onEdit={() => props.onEditCertificateRule(rule)}
            />
          ))}
        </SimpleGrid>
      </Box>
      <WizardModal isOpen={isOpen} onClose={onClose} onAdd={onAddRule} />
    </>
  )
}

export default Overview
