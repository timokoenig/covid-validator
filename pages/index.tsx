import React, { useEffect } from 'react'
import { Container, useDisclosure } from '@chakra-ui/react'
import Header from '../components/header'
import Card from '../components/card'
import Information from '../components/information'
import Footer from '../components/footer'
import OnboardingModal from '~/components/onboarding-modal'
import { useTranslation } from 'react-i18next'

const IndexPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { i18n } = useTranslation()

  useEffect(() => {
    // check if we need to show the onboarding
    const onboarding = localStorage.getItem('onboarding')
    if (onboarding !== 'true') {
      onOpen()
    }
    // change users preferred language
    const language = localStorage.getItem('lang')
    i18n.changeLanguage(language ?? 'en')
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
