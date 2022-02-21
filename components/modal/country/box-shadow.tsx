import { Box } from '@chakra-ui/react'
import React from 'react'
import useColorMode from '../../../utils/color-mode'

const BoxShadow = () => {
  const { isDarkMode } = useColorMode()

  return (
    <Box
      w="100%"
      h="70px"
      position="sticky"
      left="0"
      bottom="-5"
      bgGradient={
        isDarkMode
          ? 'linear-gradient(0deg, rgba(45,55,72,1) 50%, rgba(45,55,72,0) 100%)'
          : 'linear-gradient(0deg, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%)'
      }
    />
  )
}

export default BoxShadow
