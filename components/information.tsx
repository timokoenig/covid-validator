import React from 'react'
import { Heading, Box, Text, Link } from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'

const Information = () => {
  const { t } = useTranslation('common')
  return (
    <Box mb="10">
      <Box mb="5">
        <Heading as="h4" size="md" mb="2">
          {t('information.purpose')}
        </Heading>
        <Text>{t('information.purpose.message')}</Text>
      </Box>

      <Box mb="5">
        <Heading as="h4" size="md" mb="2">
          <Trans i18nKey="information.beta" t={t}>
            x
            <Text display="inline" color="red">
              BETA
            </Text>
            y
          </Trans>
        </Heading>
        <Text>
          <Trans i18nKey="information.beta.message" t={t}>
            x
            <Link
              href="https://github.com/timokoenig/covid-validator"
              target="_blank"
              style={{ textDecoration: 'underline' }}
              mx="1"
            >
              Github
            </Link>
            y
          </Trans>
        </Text>
      </Box>

      <Box mb="5">
        <Heading as="h4" size="md" mb="2">
          {t('information.rules')}
        </Heading>
        <Text>
          <Trans i18nKey="information.rules.message" t={t}>
            x
            <Link
              href="https://github.com/timokoenig/covid-validator/issues/4"
              target="_blank"
              style={{ textDecoration: 'underline' }}
              mx="1"
            >
              here
            </Link>
            y
          </Trans>
        </Text>
      </Box>

      <Box mb="5">
        <Heading as="h4" size="md" mb="2">
          {t('information.issue')}
        </Heading>
        <Text>
          <Trans i18nKey="information.issue.message" t={t}>
            x
            <Link
              href="https://github.com/timokoenig/covid-validator"
              target="_blank"
              style={{ textDecoration: 'underline' }}
              mx="1"
            >
              Github
            </Link>
            y
          </Trans>
        </Text>
      </Box>

      <Box mb="5">
        <Heading as="h4" size="md" mb="2">
          {t('information.certificate')}
        </Heading>
        <Text>
          <Trans i18nKey="information.certificate.message" t={t}>
            x
            <Link
              href="https://ec.europa.eu/info/live-work-travel-eu/coronavirus-response/safe-covid-19-vaccines-europeans/eu-digital-covid-certificate_en"
              target="_blank"
              style={{ textDecoration: 'underline' }}
              mx="1"
            >
              the offical website of the EU
            </Link>
            y
          </Trans>
        </Text>
      </Box>
    </Box>
  )
}

export default Information
