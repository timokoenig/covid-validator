import React from 'react'
import {
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Box,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import countries from '../../../utils/countries'
import rules from '../../../utils/eu-dcc-rules.json'
import { Rules, Rule, Language } from '../../../utils/certlogic'
import BoxShadow from './box-shadow'

type Props = {
  selection: { country: string; state: string }
  setConfirm: (confirm: boolean) => void
  onSave: () => void
}

const RuleConfirmation = (props: Props) => {
  const { t } = useTranslation('common')
  const allCountries = countries(useTranslation('country').t)
  const country = allCountries.find(item => item.code == props.selection.country) ?? allCountries[0]
  const state = country.states.find(item => item.code == props.selection.state) ?? country.states[0]

  const preferredLanguage = localStorage.getItem('i18nextLng')?.substring(0, 2) ?? 'en'
  const countryRules: Rule[] = (rules as Rules).rules
    .filter(rule => moment() >= moment(rule.ValidFrom) && moment() < moment(rule.ValidTo))
    .filter(rule => rule.Country == country.code)
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
    <ModalContent>
      <ModalHeader>
        {country.name} / {state.name}
      </ModalHeader>
      <ModalCloseButton />

      <ModalBody>
        <Text fontWeight="semibold" mb="5">
          {t('modal.rules.confirmation')}
        </Text>
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

      <ModalFooter>
        <Button
          size="lg"
          variant="outline"
          backgroundColor="transparent"
          mr={3}
          onClick={() => props.setConfirm(false)}
        >
          {t('back')}
        </Button>
        <Box flex="1" />
        <Button
          size="lg"
          variant="ghost"
          color="white"
          backgroundColor="blue.400"
          _hover={{ bg: 'blue.300' }}
          _active={{ bg: 'blue.400' }}
          mr={3}
          onClick={props.onSave}
        >
          {t('modal.rules.confirmation.confirm')}
        </Button>
      </ModalFooter>
    </ModalContent>
  )
}

export default RuleConfirmation