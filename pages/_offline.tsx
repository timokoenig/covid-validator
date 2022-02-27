import React from 'react'
import { Container, Heading, Text, Center, Box } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import Header from '../components/header'
import Footer from '../components/footer'
import PageMeta from '../components/page-meta'

const OfflinePage = () => {
  const { t } = useTranslation('common')
  return (
    <>
      <PageMeta allowIndex={false} />
      <Container marginTop={10}>
        <Header showMenu={false} />
        <Center px="10" py="20">
          <Box>
            <Heading textAlign="center" mb="2">
              {t('offline')}
            </Heading>
            <Text textAlign="center">{t('offline.message')}</Text>
          </Box>
        </Center>
        <Footer />
      </Container>
    </>
  )
}

export default OfflinePage
