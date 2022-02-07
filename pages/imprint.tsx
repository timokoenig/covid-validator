import React from 'react'
import { Container, Heading, Text } from '@chakra-ui/react'
import Header from '../components/header'
import Footer from '../components/footer'
import PageMeta from '../components/page-meta'

const ImprintPage = () => (
  <>
    <PageMeta allowIndex={false} />
    <Container marginTop={10}>
      <Header showMenu={false} />
      <Heading>Imprint</Heading>
      <Text mb="10">Information in accordance with Section 5 TMG</Text>

      <Heading size="md">LEGAL DISCLOSURE</Heading>
      <Text mb="10">
        {process.env.NEXT_PUBLIC_CONTACT_NAME}
        <br />
        {process.env.NEXT_PUBLIC_CONTACT_ADDRESS}
        <br />
        {process.env.NEXT_PUBLIC_CONTACT_ADDRESS_COUNTRY}
      </Text>

      <Heading size="md">CONTACT INFORMATION</Heading>
      <Text mb="10">E-Mail: {process.env.NEXT_PUBLIC_CONTACT_EMAIL}</Text>

      <Footer />
    </Container>
  </>
)

export default ImprintPage
