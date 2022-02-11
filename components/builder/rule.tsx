import { DeleteIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Rule = () => {
  return (
    <Box borderRadius="10" backgroundColor="gray.700" padding="5">
      <Flex>
        <Box flex="1" display="flex" flexDireaction="row" alignItems="center">
          <Text fontWeight="semibold">V0.0.0.0</Text>
        </Box>
        <Button colorScheme="red">
          <DeleteIcon width="3" height="3" />
        </Button>
      </Flex>
    </Box>
  )
}

export default Rule
