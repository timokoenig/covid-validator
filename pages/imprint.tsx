import React from 'react'
import { Container, Heading, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import Header from '../components/header'
import Footer from '../components/footer'
import PageMeta from '../components/page-meta'

const ImprintPage = () => {
  const { t } = useTranslation('common')
  return (
    <>
      <PageMeta allowIndex={false} />
      <Container marginTop={10}>
        <Header showMenu={false} />
        <Heading>{t('imprint')}</Heading>
        <Text mb="10">{t('imprint.information')}</Text>

        <Heading size="md">{t('imprint.legal')}</Heading>
        <Text mb="10">
          {process.env.NEXT_PUBLIC_CONTACT_NAME}
          <br />
          {process.env.NEXT_PUBLIC_CONTACT_ADDRESS}
          <br />
          {process.env.NEXT_PUBLIC_CONTACT_ADDRESS_CITY}
          <br />
          {process.env.NEXT_PUBLIC_CONTACT_ADDRESS_COUNTRY}
        </Text>

        <Heading size="md">{t('imprint.contact')}</Heading>
        <Text mb="10">
          {t('imprint.email')}: {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
        </Text>

        <Footer />
      </Container>
    </>
  )
}

export default ImprintPage
