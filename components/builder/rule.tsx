import { DeleteIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'

type Props = {
  onDelete: () => void
}

const Rule = (props: Props) => {
  return (
    <Box borderRadius="10" backgroundColor="gray.700" padding="5">
      <Flex>
        <Box flex="1" display="flex" flexDireaction="row" alignItems="center">
          <Text fontWeight="semibold">V0.0.0.0</Text>
        </Box>
        <Button colorScheme="red" onClick={props.onDelete}>
          <DeleteIcon width="3" height="3" />
        </Button>
      </Flex>
    </Box>
  )
}

export default Rule
