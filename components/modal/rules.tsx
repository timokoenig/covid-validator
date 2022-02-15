/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Box,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { app } from '../../state/app'
import builderStateRulesDE from '../../utils/builder-state-rules-de.json'
import { encodeCertificateRule } from '../../utils/certificate-rule'
import { Language, Rule, Rules } from '../../utils/certlogic'
import countries from '../../utils/countries'
import rules from '../../utils/eu-dcc-rules.json'
import BoxShadow from './country/box-shadow'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const RulesModal = (props: Props) => {
  const { t } = useTranslation('common')
  const appState = app.use()
  const allCountries = countries(useTranslation('country').t)
  const country = allCountries.find(item => item.code == appState.country) ?? allCountries[0]
  const state = country.states.find(item => item.code == appState.state) ?? country.states[0]

  const preferredLanguage = localStorage.getItem('i18nextLng')?.substring(0, 2) ?? 'en'
  let countryRules: Rule[] = (rules as Rules).rules
    .filter(rule => moment() >= moment(rule.ValidFrom) && moment() < moment(rule.ValidTo))
    .filter(rule => rule.Country == country.code)

  // TODO temporary solution for state rules
  if (appState.country.toUpperCase() === 'DE' && appState.state !== '') {
    const customRule = builderStateRulesDE.customRules.find(
      rule => rule.id === 'de45d285-c750-4537-bb09-79910079a559'
    )!
    countryRules = customRule.rules
      .map(rule => encodeCertificateRule(customRule, rule))
      .flatMap(r => (r ? [r] : []))
  }

  const mapLanguage = (rule: Rule): Language | null => {
    if (rule.Description.length == 0) return null
    return (
      rule.Description.find(desc => desc.lang.toLowerCase() == preferredLanguage.toLowerCase()) ??
      rule.Description.find(desc => desc.lang.toLowerCase() == 'en') ??
      rule.Description[0]
    )
  }

  const items: { title: string; items: (Language | null)[] }[] = [
    {
      title: t('vaccination'),
      items: countryRules.filter(rule => rule.CertificateType == 'Vaccination').map(mapLanguage),
    },
    {
      title: t('recovery'),
      items: countryRules.filter(rule => rule.CertificateType == 'Recovery').map(mapLanguage),
    },
    {
      title: t('test'),
      items: countryRules.filter(rule => rule.CertificateType == 'Test').map(mapLanguage),
    },
  ]

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="lg" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {country.name} / {state.name}
        </ModalHeader>
        <ModalCloseButton onClick={props.onClose} />

        <ModalBody>
          {items.map(item => {
            if (item.items.length == 0) return null
            return (
              <Box key={item.title}>
                <Text fontWeight="semibold">{item.title}</Text>
                <UnorderedList>
                  {item.items.map(desc => (
                    <ListItem mb="2" key={desc?.desc ?? ''}>
                      {desc ? desc.desc : 'n/a'}
                    </ListItem>
                  ))}
                </UnorderedList>
              </Box>
            )
          })}
          <BoxShadow />
        </ModalBody>

        <ModalFooter />
      </ModalContent>
    </Modal>
  )
}

export default RulesModal
