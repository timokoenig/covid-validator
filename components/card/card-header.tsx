import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { app } from '../../state/app'
import { getCountryAndState } from '../../utils/certlogic'
import Flag from '../flag'

const CardHeader = () => {
  const { t } = useTranslation('country')
  const appState = app.use()
  const countryAndState = getCountryAndState(t, appState.country, appState.state)

  return (
    <Box display="flex" flexDirection="row" px="5" py="3" backgroundColor="blue.300">
      {appState.country.length == 2 && (
        <Box display="flex" alignItems="center">
          <Flag country={countryAndState.country.code.toLowerCase()} size={25} />
        </Box>
      )}
      <Box textAlign="center" flex="1" mx="6" color="white">
        <Text fontSize="lg" wordBreak="break-word" whiteSpace="normal" fontWeight="bold">
          {countryAndState.country.name}
        </Text>
        {countryAndState.state.name && (
          <Text fontSize="md" wordBreak="break-word" whiteSpace="normal" fontWeight="400">
            {countryAndState.state.name}
          </Text>
        )}
      </Box>
      <Box display="flex" alignItems="center">
        <Text fontSize="lg" justifySelf="flex-end" fontWeight="bold" color="white">
          {countryAndState.country.code === 'DE' ? appState.purpose : ''}
        </Text>
      </Box>
    </Box>
  )
}

export default CardHeader
