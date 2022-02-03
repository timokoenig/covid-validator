import React from 'react'
import { Container } from '@chakra-ui/react'
import Header from '../components/header'
import Card from '../components/card'
import Information from '../components/information'
import Footer from '../components/footer'

const IndexPage = () => (
  <Container marginTop={10}>
    <Header />
    <Card />
    <Information />
    <Footer />
  </Container>
)

export default IndexPage
