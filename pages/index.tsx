import React, { useEffect } from 'react'
import { Container, useDisclosure } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import Header from '../components/header'
import Card from '../components/card'
import Information from '../components/information'
import Footer from '../components/footer'
import OnboardingModal from '~/components/onboarding-modal'

type Props = {
  version: string
}

const IndexPage = (props: Props) => {
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
    i18n.changeLanguage(language ?? 'en').catch(console.log)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Container marginTop={10}>
        <Header version={props.version} />
        <Card />
        <Information />
        <Footer />
      </Container>
      <OnboardingModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export async function getInitialProps(): Promise<{ props: Props }> {
  return {
    props: {
      version: process.env.NEXT_PUBLIC_VERSION as string,
    },
  }
}

export default IndexPage
