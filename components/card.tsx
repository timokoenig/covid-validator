import React from 'react'
import { Button, Box, Text, Center } from '@chakra-ui/react'
import CardHeader from './card-header'

const Card = () => {
  return (
    <Box borderRadius="lg" overflow="hidden" bg="blue.400" boxShadow="xl" mb="10">
      <CardHeader />

      <Box p="6">
        <Center py="10">
          <Button size="lg" variant="outline" color="white">
            Check Certificate
          </Button>
        </Center>
        <Center pb="10">
          <Text fontWeight="semibold" color="white">
            some more information for the user
          </Text>
        </Center>
      </Box>
    </Box>
  )
}

export default Card
