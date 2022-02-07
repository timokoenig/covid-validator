import React from 'react'
import Head from 'next/head'
import { useTranslation } from 'react-i18next'

type Props = {
  allowIndex?: boolean
}

const PageMeta = (props: Props) => {
  const { t } = useTranslation('common')
  return (
    <Head>
      <title>Covid Validator</title>
      <meta name="description" content={t('meta.description')} />
      {props.allowIndex === false && <meta name="robots" content="noindex" />}
      <meta name="theme-color" content="#ffffff" />
      <meta property="og:title" content="covidvalidator.app" />
      <meta property="og:url" content="https://covidvalidator.app" />
      <meta property="og:image" content="https://covidvalidator.app/icon-192x192.png" />
      <meta property="og:description" content={t('meta.description')} />
      <meta property="og:type" content="website" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    </Head>
  )
}

export default PageMeta
