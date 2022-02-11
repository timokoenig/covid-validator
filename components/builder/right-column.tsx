import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import Placeholder from './placeholder'
import Rule from './rule'

type Props = {
  rules: string[]
  onChange: (rules: string[]) => void
}

const RightColumn = (props: Props) => {
  const onAdd = () => {
    props.onChange([...props.rules, '1'])
  }

  const onDelete = () => {
    props.onChange([])
  }

  return (
    <Box flex="1" px="10" py="5" display="flex" flexDirection="column" overflow="scroll">
      {props.rules.length === 0 && <Placeholder />}
      <SimpleGrid mb="5" spacing="5">
        {props.rules.map(rule => (
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
