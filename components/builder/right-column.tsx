import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { CustomRules, Rule } from '../../utils/certlogic'
import NoData from './no-data'
import Placeholder from './placeholder'
import RuleComponent from './rule'

type Props = {
  rules: CustomRules
  onChange: (rules: CustomRules) => void
}

const RightColumn = (props: Props) => {
  const onAdd = () => {
    props.onChange({
      ...props.rules,
      rules: [
        ...props.rules.rules,
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
      ...props.rules,
      rules: props.rules.rules.filter(r => r.Identifier !== rule.Identifier),
    })
  }

  if (props.rules.id === '') {
    return (
      <Box flex="1" px="10" py="5" display="flex" flexDirection="column" overflow="scroll">
        <NoData />
      </Box>
    )
  }

  return (
    <Box flex="1" px="10" py="5" display="flex" flexDirection="column" overflow="scroll">
      {props.rules.rules.length === 0 && <Placeholder />}
      <SimpleGrid mb="5" spacing="5">
        {props.rules.rules.map(rule => (
          <RuleComponent key={rule.Identifier} onDelete={() => onDelete(rule)} />
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
