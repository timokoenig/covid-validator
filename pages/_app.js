import React from 'react'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'

import '../styles/globals.css'

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
