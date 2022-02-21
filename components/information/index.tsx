import { Box } from '@chakra-ui/react'
import parse from 'html-react-parser'
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import ExternalLink from '../external-link'
import InformationBlock from './information-block'

const Information = () => {
  const { t } = useTranslation('common')
  return (
    <Box mb="10">
      <InformationBlock
        title={t('information.purpose')}
        message={parse(t('information.purpose.message')) as string}
      />

      <InformationBlock title={t('information.rules')} message={t('information.rules.message')} />

      <InformationBlock
        title={t('information.homescreen')}
        message={parse(t('information.homescreen.message')) as string}
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
