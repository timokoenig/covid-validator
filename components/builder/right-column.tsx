import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { CustomRule, Rule } from '../../utils/certlogic'
import NoData from './no-data'
import Placeholder from './placeholder'
import RuleComponent from './rule'

type Props = {
  customRule: CustomRule
  onChange: (customRule: CustomRule) => void
}

const RightColumn = (props: Props) => {
  const onAdd = () => {
    props.onChange({
      ...props.customRule,
      rules: [
        ...props.customRule.rules,
        {
          Identifier: uuidv4(),
          Type: 'Acceptance',
          Country: 'DE',
          Version: '1.0.0',
          SchemaVersion: '1.0.0',
          Engine: 'CERTLOGIC',
          EngineVersion: '0.7.5',
          CertificateType: 'Vaccination',
          Description: [],
          ValidFrom: '',
          ValidTo: '',
          AffectedFields: [],
          Logic: null,
        },
      ],
    })
  }

  const onDelete = (rule: Rule) => {
    props.onChange({
      ...props.customRule,
      rules: props.customRule.rules.filter(r => r.Identifier !== rule.Identifier),
    })
  }

  // Show instructions as long as the rule is not saved
  if (props.customRule.id === '') {
    return (
      <Box flex="1" px="10" py="5" display="flex" flexDirection="column" overflow="scroll">
        <NoData />
      </Box>
    )
  }

  return (
    <Box flex="1" px="10" py="5" display="flex" flexDirection="column" overflow="scroll">
      {props.customRule.rules.length === 0 && <Placeholder />}
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
        onClick={onAdd}
      >
        <AddIcon width="3" height="3" />
      </Button>
    </Box>
  )
}

export default RightColumn
