import { Text } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { app } from '../../../state/app'
import countries from '../../../utils/countries'

const RuleView = () => {
  const { t } = useTranslation('country')
  const appState = app.use()
  const allCountries = countries(t)
  const country = allCountries.find(item => item.code == appState.country) ?? allCountries[0]
  const state = country.states.find(item => item.code == appState.state) ?? country.states[0]
  const currentPurpose = appState.purpose
  let ruleText = `${country.name} / ${state.name}`
  if (country.code === 'DE') {
    ruleText = `${ruleText} / ${currentPurpose}`
  }
  return (
    <Text color="white" fontWeight="semibold">
      {ruleText}
    </Text>
  )
}

export default RuleView
