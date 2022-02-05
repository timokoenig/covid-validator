import React, { useEffect } from 'react'
import { Container, useDisclosure } from '@chakra-ui/react'
import Header from '../components/header'
import Card from '../components/card'
import Information from '../components/information'
import Footer from '../components/footer'
import OnboardingModal from '~/components/onboarding-modal'

const IndexPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    const onboarding = localStorage.getItem('onboarding')
    if (onboarding !== 'true') {
      onOpen()
    }
  }, [])

  return (
    <>
      <Container marginTop={10}>
        <Header />
        <Card />
        <Information />
        <Footer />
      </Container>
      <OnboardingModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default IndexPage
