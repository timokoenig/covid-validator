import React from 'react'
import { Heading, Box, Text, Link } from '@chakra-ui/react'

const Information = () => (
  <Box mb="10">
    <Box mb="5">
      <Heading as="h4" size="md" mb="2">
        What is the purpose of Covid Validator?
      </Heading>
      <Text>
        Covid Validator allows you to scan and validate EU Digital Covid Certificates based on
        country or local rules. It gives the person that checks the certificate only as little
        personal information as possible to protect the users' privacy. This web app is an
        alternative to other existing products because it does not rely on certain app stores or
        country restrictions.
      </Text>
    </Box>

    <Box mb="5">
      <Heading as="h4" size="md" mb="2">
        What does{' '}
        <Text display="inline" color="red">
          BETA
        </Text>{' '}
        mean?
      </Heading>
      <Text>
        The web app is still in active development and might contain minor bugs. The production use
        of this app is not recommended yet, so please use it with caution. Updates will come
        regularly. You can follow the development on
        <Link
          href="https://github.com/timokoenig/covid-validator"
          target="_blank"
          style={{ textDecoration: 'underline' }}
          mx="1"
        >
          Github
        </Link>
        .
      </Text>
    </Box>

    <Box mb="5">
      <Heading as="h4" size="md" mb="2">
        What rules are being used?
      </Heading>
      <Text>
        At the moment the app uses the official EU entry rules to validate the certificate. These
        rules are being provided by the member countries of the Digital Covid Certificate. It is a
        known problem that those rules might be out of date and does not reflect state or local
        regulations. This project is working on a custom rule builder that allows more precise rules
        for local regulations. You can follow the development
        <Link
          href="https://github.com/timokoenig/covid-validator/issues/4"
          target="_blank"
          style={{ textDecoration: 'underline' }}
          mx="1"
        >
          here
        </Link>
        .
      </Text>
    </Box>

    <Box mb="5">
      <Heading as="h4" size="md" mb="2">
        What to do if something is not working?
      </Heading>
      <Text>
        First check if you have selected the correct country and rules. Then try to connect your
        device to the internet to download the latest data. If your problem still occurs, go to
        <Link
          href="https://github.com/timokoenig/covid-validator"
          target="_blank"
          style={{ textDecoration: 'underline' }}
          mx="1"
        >
          Github
        </Link>
        and create an issue.
      </Text>
    </Box>

    <Box mb="5">
      <Heading as="h4" size="md" mb="2">
        What is the EU Digital Covid Certificate?
      </Heading>
      <Text>
        You can find more information about it on
        <Link
          href="https://ec.europa.eu/info/live-work-travel-eu/coronavirus-response/safe-covid-19-vaccines-europeans/eu-digital-covid-certificate_en"
          target="_blank"
          style={{ textDecoration: 'underline' }}
          mx="1"
        >
          the offical website of the EU
        </Link>
        .
      </Text>
    </Box>
  </Box>
)

export default Information
