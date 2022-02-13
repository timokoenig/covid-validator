import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, Heading, SimpleGrid, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { CustomRule, Rule } from '../../../utils/certlogic'
import WizardModal from '../modal/wizard'
import RuleComponent from '../rule'

type Props = {
  customRule: CustomRule
  onChange: (customRule: CustomRule) => void
  onEdit: () => void
}

const Overview = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  // const onAdd = () => {
  //   props.onChange({
  //     ...props.customRule,
  //     rules: [
  //       ...props.customRule.rules,
  //       {
  //         Identifier: uuidv4(),
  //         Type: 'Acceptance',
  //         Country: 'DE',
  //         Version: '1.0.0',
  //         SchemaVersion: '1.0.0',
  //         Engine: 'CERTLOGIC',
  //         EngineVersion: '0.7.5',
  //         CertificateType: 'Vaccination',
  //         Description: [],
  //         ValidFrom: '',
  //         ValidTo: '',
  //         AffectedFields: [],
  //         Logic: null,
  //       },
  //     ],
  //   })
  // }

  const onDelete = (rule: Rule) => {
    props.onChange({
      ...props.customRule,
      rules: props.customRule.rules.filter(r => r.Identifier !== rule.Identifier),
    })
  }

  return (
    <>
      <Box flex="1" px="10" py="5" display="flex" flexDirection="column" overflow="scroll">
        <Box display="flex" flexDirection="row" mb="5">
          <Heading flex="1">{props.customRule.name}</Heading>
          <Button colorScheme="blue" onClick={props.onEdit}>
            Edit
          </Button>
        </Box>
        {/* {props.customRule.rules.length === 0 && <Placeholder />} */}
        <SimpleGrid mb="5" spacing="5">
          {props.customRule.rules.map(rule => (
            <RuleComponent
              key={rule.Identifier}
              rule={rule}
              onDelete={() => onDelete(rule)}
              onEdit={() => {}}
            />
          ))}
        </SimpleGrid>
        <Button
          border="2px"
          borderStyle="dashed"
          borderColor="gray.700"
          backgroundColor="transparent"
          flex="0 1"
          p="5"
          onClick={onOpen}
        >
          <AddIcon width="3" height="3" />
        </Button>
      </Box>
      <WizardModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default Overview
