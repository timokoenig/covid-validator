import React from 'react'
import { Center, Text, Link } from '@chakra-ui/react'

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
      <Link href="https://github.com/timokoenig" target="_blank" px="2">
        Timo Koenig
      </Link>
      |
      <Link href="https://github.com/timokoenig" target="_blank" px="2">
        Imprint
      </Link>
    </Center>
  </>
)

export default Footer
