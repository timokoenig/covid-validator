import React from 'react'
import { Center, Text, Link, Box } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation('common')
  return (
    <>
      <hr />
      <Center mt="5">
        <Text>
          Made with{' '}
          <Text as="span" color="red">
            ♥
          </Text>{' '}
          for the community
        </Text>
      </Center>
      <Box mb="20" textAlign="center">
        <Link href="https://github.com/timokoenig/covid-validator" target="_blank" px="2">
          Github
        </Link>
        |
        <Link href="https://ko-fi.com/timokoenig" target="_blank" px="2">
          {t('sponsor')}
        </Link>
        |
        <Link href="/privacy" px="2">
          {t('privacy')}
        </Link>
        |
        <Link href="/imprint" px="2">
          {t('imprint')}
        </Link>
      </Box>
    </>
  )
}

export default Footer
