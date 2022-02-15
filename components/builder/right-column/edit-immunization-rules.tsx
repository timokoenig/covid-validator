import { ChevronLeftIcon, DeleteIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CustomRule, ImmunizationRule, immunizationTypeName } from '../../../utils/certlogic'
import { decodeImmunizationRule } from '../../../utils/immunization-rule'
import vaccines from '../../../utils/vaccines'
import ImmunizationWizardModal from '../modal/immunization-wizard'

type Props = {
  customRule: CustomRule
  onChange: (customRule: CustomRule) => void
  onBack: () => void
}

const EditImmunizationRules = (props: Props) => {
  const { t } = useTranslation('common')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [rules, setRules] = useState<ImmunizationRule[]>(props.customRule.immunizationRules)

  useEffect(() => {
    setRules(props.customRule.immunizationRules)
  }, [props.customRule])

  const onCreate = (rule: ImmunizationRule) => {
    setRules([...rules, rule])
  }

  const onDelete = (rule: ImmunizationRule) => {
    setRules(rules.filter(r => r.id !== rule.id))
  }

  const onSave = () => {
    props.onChange({
      ...props.customRule,
      immunizationRules: rules,
    })
  }

  return (
    <>
      <Box flex="1" px="10" py="5" display="flex" flexDirection="column" overflow="scroll">
        <Box display="flex" flexDirection="row" mb="5">
          <Button onClick={props.onBack} mr="5">
            <ChevronLeftIcon width="5" height="5" />
          </Button>
          <Heading flex="1">{t('builder.rules.immunization')}</Heading>
          <Button colorScheme="blue" onClick={onSave}>
            {t('save')}
          </Button>
        </Box>
        <Box textAlign="right">
          <Button colorScheme="blue" onClick={onOpen}>
            {t('builder.rules.add')}
          </Button>
        </Box>
        <Table>
          <Thead>
            <Tr>
              <Th>{t('vaccine')}</Th>
              <Th>{t('builder.rules.dose')}</Th>
              <Th>{t('type')}</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {rules.map(rule => {
              const decodedRule = decodeImmunizationRule(rule.rule)
              const logic = `${decodedRule.dn} ${decodedRule.symbol} ${decodedRule.sd}`
              return (
                <Tr key={rule.id}>
                  <Td>
                    {rule.medicalProducts.map(mp => (
                      <Text key={mp}>{vaccines.find(v => v.id === mp)?.name}</Text>
                    ))}
                  </Td>
                  <Td>{logic}</Td>
                  <Td>{immunizationTypeName(rule.type)}</Td>
                  <Td>
                    <Button colorScheme="red" onClick={() => onDelete(rule)}>
                      <DeleteIcon width="4" height="4" />
                    </Button>
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </Box>
      <ImmunizationWizardModal isOpen={isOpen} onClose={onClose} onCreate={onCreate} />
    </>
  )
}

export default EditImmunizationRules
