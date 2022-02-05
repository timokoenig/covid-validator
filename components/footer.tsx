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
    <Center mb="20">
      <Link href="https://github.com/timokoenig/covid-validator" target="_blank" px="2">
        Github
      </Link>
      |
      <Link href="https://ko-fi.com/timokoenig" target="_blank" px="2">
        Sponsor
      </Link>
      |
      <Link href="/privacy" px="2">
        Data Pivacy
      </Link>
      |
      <Link href="/imprint" px="2">
        Imprint
      </Link>
    </Center>
  </>
)

export default Footer
