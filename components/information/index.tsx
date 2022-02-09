import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import { Trans, useTranslation } from 'react-i18next'
import ExternalLink from '../external-link'
import InformationBlock from './information-block'

const Information = () => {
  const { t } = useTranslation('common')
  return (
    <Box mb="10">
      <InformationBlock
        title={t('information.purpose')}
        message={t('information.purpose.message')}
      />

      <InformationBlock
        title={
          <Trans i18nKey="information.beta" t={t}>
            x
            <Text display="inline" color="red">
              BETA
            </Text>
            y
          </Trans>
        }
        message={
          <Trans i18nKey="information.beta.message" t={t}>
            x
            <ExternalLink href="https://github.com/timokoenig/covid-validator">Github</ExternalLink>
            y
          </Trans>
        }
      />

      <InformationBlock
        title={t('information.rules')}
        message={
          <Trans i18nKey="information.rules.message" t={t}>
            x
            <ExternalLink href="https://github.com/timokoenig/covid-validator/issues/4">
              here
            </ExternalLink>
            y
          </Trans>
        }
      />

      <InformationBlock
        title={t('information.issue')}
        message={
          <Trans i18nKey="information.issue.message" t={t}>
            x
            <ExternalLink href="https://github.com/timokoenig/covid-validator">Github</ExternalLink>
            y
          </Trans>
        }
      />

      <InformationBlock
        title={t('information.certificate')}
        message={
          <Trans i18nKey="information.certificate.message" t={t}>
            x
            <ExternalLink href="https://ec.europa.eu/info/live-work-travel-eu/coronavirus-response/safe-covid-19-vaccines-europeans/eu-digital-covid-certificate_en">
              the offical website of the EU
            </ExternalLink>
            y
          </Trans>
        }
      />
    </Box>
  )
}

export default Information
