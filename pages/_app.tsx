/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import '@/node_modules/flag-icons/css/flag-icons.min.css'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { AppProps } from 'next/app'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import '../styles/globals.css'

i18next
  .use(LanguageDetector)
  .init({
    interpolation: { escapeValue: false },
    fallbackLng: 'en',
    resources: {
      en: {
        common: require('../translations/en/common.json'),
        country: require('../translations/en/country.json'),
      },
      de: {
        common: require('../translations/de/common.json'),
        country: require('../translations/de/country.json'),
      },
    },
  })
  .catch(console.log)

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <I18nextProvider i18n={i18next}>
        <CSSReset />
        <Component {...pageProps} />
      </I18nextProvider>
    </ChakraProvider>
  )
}

export default App
