import React from 'react'
import { Heading, Box, Text } from '@chakra-ui/react'

const Information = () => (
  <Box mb="10">
    <Box mb="5">
      <Heading as="h4" size="md">
        What is the purpose of Covid Validator?
      </Heading>
      <Text>to look good</Text>
    </Box>
    <Box mb="5">
      <Heading as="h4" size="md">
        What does{' '}
        <Text display="inline" color="red">
          BETA
        </Text>{' '}
        mean?
      </Heading>
      <Text>that it will most likely crash at some point</Text>
    </Box>
    <Box mb="5">
      <Heading as="h4" size="md">
        Where do the the rules come from?
      </Heading>
      <Text>from the cloud</Text>
    </Box>
    <Box mb="5">
      <Heading as="h4" size="md">
        Where do I get help if something is not working?
      </Heading>
      <Text>visit github and create an issue</Text>
      <Box pt="3">
        <Text>Known issues that are being worked on</Text>
        <Text>* Camera quality affects scan time</Text>
      </Box>
    </Box>
  </Box>
)

export default Information
