import React, { useEffect } from 'react'
import { Container, useDisclosure } from '@chakra-ui/react'
import Header from '../components/header'
import Card from '../components/card'
import Information from '../components/information'
import Footer from '../components/footer'
import OnboardingModal from '~/components/onboarding-modal'
import PageMeta from '~/components/page-meta'

const IndexPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    // check if we need to show the onboarding
    const onboarding = localStorage.getItem('onboarding')
    if (onboarding !== 'true') {
      onOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <PageMeta />
      <Container marginTop={10}>
        <Header version={process.env.NEXT_PUBLIC_VERSION as string} />
        <Card />
        <Information />
        <Footer />
      </Container>
      <OnboardingModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default IndexPage
