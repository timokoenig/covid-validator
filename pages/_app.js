import React from 'react'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'

import '../styles/globals.css'

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      common: require('../translations/en/common.json'),
    },
    de: {
      common: require('../translations/de/common.json'),
    },
  },
})

const App = ({ Component, pageProps }) => {
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
