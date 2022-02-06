import React from 'react'
import { Container, Heading, Text } from '@chakra-ui/react'
import Header from '../components/header'
import Footer from '../components/footer'

type Props = {
  contactName: string
  contactAddress: string
  contactAddressCountry: string
  contactEmail: string
}

const ImprintPage = (props: Props) => (
  <Container marginTop={10}>
    <Header showMenu={false} />
    <Heading>Imprint</Heading>
    <Text mb="10">Information in accordance with Section 5 TMG</Text>

    <Heading size="md">LEGAL DISCLOSURE</Heading>
    <Text mb="10">
      {props.contactName}
      <br />
      {props.contactAddress}
      <br />
      {props.contactAddressCountry}
    </Text>

    <Heading size="md">CONTACT INFORMATION</Heading>
    <Text mb="10">E-Mail: {props.contactEmail}</Text>

    <Footer />
  </Container>
)

export async function getStaticProps(): Promise<{ props: Props }> {
  return {
    props: {
      contactName: process.env.CONTACT_NAME as string,
      contactAddress: process.env.CONTACT_ADDRESS as string,
      contactAddressCountry: process.env.CONTACT_ADDRESS_COUNTRY as string,
      contactEmail: process.env.CONTACT_EMAIL as string,
    },
  }
}

export default ImprintPage
