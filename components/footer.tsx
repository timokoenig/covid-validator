import { Box, Center, Link, Text } from '@chakra-ui/react'
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation('common')
  return (
    <>
      <hr />
      <Center mt="5">
        <Text>
          <Trans i18nKey="footer.madewithheart" t={t}>
            x
            <Text as="span" color="red">
              ♥
            </Text>
            y
          </Trans>
        </Text>
      </Center>
      <Box mb="20" textAlign="center">
        <Link href="/builder" px="2" display="inline-block">
          {t('builder')}
        </Link>
        |
        <Link
          href="https://github.com/timokoenig/covid-validator"
          target="_blank"
          px="2"
          display="inline-block"
        >
          {t('github')}
        </Link>
        |
        <Link href="https://ko-fi.com/timokoenig" target="_blank" px="2" display="inline-block">
          {t('sponsor')}
        </Link>
        |
        <Link href="/privacy" px="2" display="inline-block">
          {t('privacy')}
        </Link>
        |
        <Link href="/imprint" px="2" display="inline-block">
          {t('imprint')}
        </Link>
      </Box>
    </>
  )
}

export default Footer
