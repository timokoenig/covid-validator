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
import { CustomRule, ImmunizationRule } from '../../../utils/certlogic'
import ImmunizationWizardModal from '../modal/immunization-wizard'

type Props = {
  customRule: CustomRule
  onChange: (customRule: CustomRule) => void
  onBack: () => void
}

const EditImmunizationRules = (props: Props) => {
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
          <Heading flex="1">Immunzation Rules</Heading>
          <Button colorScheme="blue" onClick={onSave}>
            Save
          </Button>
        </Box>
        <Text mb="10">Some explanation what this is</Text>
        <Box textAlign="right">
          <Button colorScheme="blue" onClick={onOpen}>
            Add Rule
          </Button>
        </Box>
        <Table>
          <Thead>
            <Tr>
              <Th>Vaccine</Th>
              <Th>Dose Rule</Th>
              <Th>Type</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {rules.map(rule => (
              <Tr key={rule.medicalProducts.join('') + rule.rule}>
                <Td>
                  {rule.medicalProducts.map(mp => (
                    <Text key={mp}>{mp}</Text>
                  ))}
                </Td>
                <Td>{rule.rule}</Td>
                <Td>{rule.type}</Td>
                <Td>
                  <Button colorScheme="red" onClick={() => onDelete(rule)}>
                    <DeleteIcon width="4" height="4" />
                  </Button>
                </Td>
              </Tr>
            ))}
            {/* <Tr>
              <Td>BioNTech</Td>
              <Td>1 == 1</Td>
              <Td>Partial Immunization</Td>
            </Tr>
            <Tr>
              <Td>BioNTech</Td>
              <Td>2 == 2</Td>
              <Td>Full Immunization</Td>
            </Tr>
            <Tr>
              <Td>BioNTech</Td>
              <Td>1 == 1</Td>
              <Td>Full Immunization after Recovery</Td>
            </Tr>
            <Tr>
              <Td>BioNTech</Td>
              <Td>* &gt; 2</Td>
              <Td>Booster</Td>
            </Tr>
            <Tr>
              <Td>BioNTech</Td>
              <Td>* &gt; *</Td>
              <Td>Booster</Td>
            </Tr> */}
          </Tbody>
        </Table>
      </Box>
      <ImmunizationWizardModal isOpen={isOpen} onClose={onClose} onCreate={onCreate} />
    </>
  )
}

export default EditImmunizationRules
