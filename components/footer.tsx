import React from 'react'
import { Center, Text } from '@chakra-ui/react'

const Footer = () => (
  <>
    <hr />
    <Center mt="5">
      <Text>
        Made with{' '}
        <Text as="span" color="red">
          ♥
        </Text>{' '}
        for the community
      </Text>
    </Center>
    <Center>
      <Text as="a" href="https://github.com/timokoenig" target="_blank" px="2">
        Timo Koenig
      </Text>
      |
      <Text as="a" href="https://github.com/timokoenig" target="_blank" px="2">
        Imprint
      </Text>
    </Center>
  </>
)

export default Footer
