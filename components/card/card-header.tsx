import { Box, Button, ButtonProps, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { app, disableScanner, enableScanner } from '../../state/app'
import { getCountryAndState } from '../../utils/helper'
import Flag from '../flag'
import RulesModal from '../modal/rules'

const CustButton = (props: ButtonProps) => (
  <Button
    {...props}
    backgroundColor="inherit"
    pl="5"
    py="3"
    h="auto"
    borderRadius="0"
    borderBottom="1px"
    borderBottomColor="blue.300"
    _hover={{ bgColor: 'blue.400' }}
    _active={{ bgColor: 'blue.300' }}
  >
    {props.children}
  </Button>
)

const CardHeader = () => {
  const { t } = useTranslation('country')
  const appState = app.use()
  const countryAndState = getCountryAndState(t, appState.country, appState.state)
  const { isOpen: isOpenRules, onOpen: onOpenRules, onClose: onCloseRules } = useDisclosure()

  return (
    <>
      <Box display="flex" flexDirection="row" backgroundColor="blue.300">
        <CustButton
          flex="1"
          onClick={() => {
            disableScanner()
            onOpenRules()
          }}
        >
          <Box display="flex" alignItems="center">
            <Flag country={countryAndState.country.code.toLowerCase()} size={25} />
          </Box>
          <Box textAlign="center" flex="1" mx="6" color="white">
            <Text fontSize="lg" wordBreak="break-word" whiteSpace="normal" fontWeight="bold">
              {countryAndState.country.name}
            </Text>
            <Text fontSize="md" wordBreak="break-word" whiteSpace="normal" fontWeight="400">
              {countryAndState.state.name}
            </Text>
          </Box>
          <Box display="flex" alignItems="center">
            <Text fontSize="lg" justifySelf="flex-end" fontWeight="bold" color="white">
              {countryAndState.country.code === 'DE' ? appState.purpose : ''}
            </Text>
          </Box>
        </CustButton>
      </Box>
      <RulesModal
        isOpen={isOpenRules}
        onClose={() => {
          enableScanner()
          onCloseRules()
        }}
      />
    </>
  )
}

export default CardHeader
