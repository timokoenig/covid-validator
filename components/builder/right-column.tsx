import { AddIcon } from '@chakra-ui/icons'
import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import Placeholder from './placeholder'
import Rule from './rule'

const RightColumn = () => {
  return (
    <Box flex="1" px="10" py="5" display="flex" flexDirection="column">
      <Placeholder />
      <Box mb="5">
        <Rule />
      </Box>
      <Button
        border="2px"
        borderStyle="dashed"
        borderColor="gray.700"
        backgroundColor="transparent"
        flex="0 1"
        p="5"
      >
        <AddIcon width="3" height="3" />
      </Button>
    </Box>
  )
}

export default RightColumn
