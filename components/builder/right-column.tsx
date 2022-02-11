import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import Placeholder from './placeholder'

const RightColumn = () => {
  return (
    <Box flex="1" px="10" py="5" display="flex" flexDirection="column">
      <Placeholder />
      <Box mb="5">
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
