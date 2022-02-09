import React from 'react'
import { Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import countries from '../../../utils/countries'
import purpose from '../../../utils/purpose'

const RuleView = () => {
  const { t } = useTranslation('country')
  const allCountries = countries(t)
  const country =
    allCountries.find(item => item.code == (localStorage.getItem('country') ?? 'DE')) ??
    allCountries[0]
  const state =
    country.states.find(item => item.code == localStorage.getItem('state')) ?? country.states[0]
  const currentPurpose = localStorage.getItem('purpose') ?? purpose[0].title
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
