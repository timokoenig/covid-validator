/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import '@/node_modules/flag-icons/css/flag-icons.min.css'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import '../styles/globals.css'
import i18next from '../utils/i18next'

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
