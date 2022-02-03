import React from 'react'
import { Container, Heading, Text } from '@chakra-ui/react'
import Header from '../components/header'
import Footer from '../components/footer'
import parse from 'html-react-parser'

type Props = {
  contactDetails: string
  contactEmail: string
}

const ImprintPage = (props: Props) => (
  <Container marginTop={10}>
    <Header />
    <Heading>Imprint</Heading>
    <Text mb="10">Information in accordance with Section 5 TMG</Text>

    <Heading size="md">LEGAL DISCLOSURE</Heading>
    <Text mb="10">{parse(props.contactDetails)}</Text>

    <Heading size="md">CONTACT INFORMATION</Heading>
    <Text mb="10">E-Mail: {props.contactEmail}</Text>

    <Footer />
  </Container>
)

export async function getStaticProps(): Promise<{ props: Props }> {
  return {
    props: {
      contactDetails: process.env.CONTACT_DETAILS as string,
      contactEmail: process.env.CONTACT_EMAIL as string,
    },
  }
}

export default ImprintPage
