import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, SimpleGrid } from '@chakra-ui/react'
import React, { useState } from 'react'
import Placeholder from './placeholder'
import Rule from './rule'

type Props = {
  rules: string[]
  onChange: (rules: string[]) => void
}

const RightColumn = (props: Props) => {
  const [rules, setRules] = useState<string[]>([])
  const onAdd = () => {
    // props.onChange([...props.rules, '1'])
    setRules([...rules, '1'])
  }

  const onDelete = () => {
    // props.onChange([])
    setRules([])
  }

  return (
    <Box flex="1" px="10" py="5" display="flex" flexDirection="column" overflow="scroll">
      {rules.length === 0 && <Placeholder />}
      <SimpleGrid mb="5" spacing="5">
        {rules.map(rule => (
          <Rule key={rule} onDelete={onDelete} />
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
