import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { app } from '../../state/app'
import countries from '../../utils/countries'
import Flag from '../flag'

const CardHeader = () => {
  const { t } = useTranslation('country')
  const appState = app.use()
  const allCountries = countries(t)
  const country = allCountries.find(item => item.code == appState.country) ?? allCountries[0]
  const state = country.states.find(item => item.code == appState.state) ?? country.states[0]

  return (
    <Box display="flex" flexDirection="row" px="5" py="3" backgroundColor="blue.300">
      <Box display="flex" alignItems="center">
        <Flag country={country.code.toLowerCase()} size={25} />
      </Box>
      <Box textAlign="center" flex="1" mx="6" color="white">
        <Text fontSize="lg" wordBreak="break-word" whiteSpace="normal" fontWeight="bold">
          {country.name}
        </Text>
        <Text fontSize="md" wordBreak="break-word" whiteSpace="normal" fontWeight="400">
          {state.name}
        </Text>
      </Box>
      <Box display="flex" alignItems="center">
        <Text fontSize="lg" justifySelf="flex-end" fontWeight="bold" color="white">
          {country.code === 'DE' ? appState.purpose : ''}
        </Text>
      </Box>
    </Box>
  )
}

export default CardHeader
