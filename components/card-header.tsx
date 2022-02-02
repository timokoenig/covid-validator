import React from 'react'
import { Button, Text, Image, Spacer } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

const CardHeader = () => (
  <Button
    px="5"
    py="10"
    isFullWidth
    backgroundColor={'blue.300'}
    _hover={{ bg: 'blue.200' }}
    _active={{ bg: 'blue.300' }}
    display="flex"
    flexDirection="row"
    alignItems="center"
  >
    <Image
      src="https://raw.githubusercontent.com/lipis/flag-icons/main/flags/1x1/de.svg"
      width="5"
      height="5"
      borderRadius="10"
      marginRight="2"
    />
    <Text fontSize="h4" fontWeight="bold" color="white">
      Germany / Hamburg / 2G+
    </Text>
    <Spacer />
    <ChevronDownIcon w={8} h={8} color="white" />
  </Button>
)

export default CardHeader
