import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const NoData = () => {
  return (
    <Box p="10">
      <Text textAlign="center">
        Add name and press save
        <br />
        or load custom rule to continue
      </Text>
    </Box>
  )
}

export default NoData
