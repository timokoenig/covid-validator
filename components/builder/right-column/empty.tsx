import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const Empty = () => (
  <Box flex="1" px="10" py="5" display="flex" flexDirection="column" overflow="scroll">
    <Box p="10">
      <Text textAlign="center">Add or select custom rule to continue</Text>
    </Box>
  </Box>
)

export default Empty
