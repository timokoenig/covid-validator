import React from 'react'
import Head from 'next/head'

const PageMeta = () => (
  <Head>
    <title>Covid Validator</title>
    <meta
      name="description"
      content="Check EU Digitial Covid Certificates with ease and validate them against country and local rules"
    />
    <meta name="theme-color" content="#ffffff" />
    <meta property="og:title" content="covidvalidator.de" />
    <meta property="og:url" content="https://covidvalidator.de" />
    <meta property="og:image" content="https://covidvalidator.de/icon-192x192.png" />
    <meta
      property="og:description"
      content="Check EU Digitial Covid Certificates with ease and validate them against country and local rules"
    />
    <meta property="og:type" content="website" />
    <link rel="manifest" href="/manifest.json" />
    <link rel="icon" href="/favicon.ico" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  </Head>
)

export default PageMeta
