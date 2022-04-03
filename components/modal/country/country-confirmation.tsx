/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Box,
  Button,
  ListItem,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { CertLogic, Language, Rule } from '../../../utils/certlogic'
import { getCountryAndState } from '../../../utils/helper'
import BoxShadow from './box-shadow'

type Props = {
  selection: { country: string; state: string }
  setConfirm: (confirm: boolean) => void
  onSave: () => void
}

const RuleConfirmation = (props: Props) => {
  const { t } = useTranslation('common')
  const certLogic = new CertLogic()
  const countryAndState = getCountryAndState(
    useTranslation('country').t,
    props.selection.country,
    props.selection.state
  )

  const preferredLanguage = localStorage.getItem('i18nextLng')?.substring(0, 2) ?? 'en'
  const countryRules = certLogic.acceptanceRules(
    countryAndState.country.code,
    countryAndState.state.code
  )

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
      title: t('general'),
      items: countryRules.filter(rule => rule.CertificateType == 'General').map(mapLanguage),
    },
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
        {countryAndState.state.code === ''
          ? countryAndState.country.name
          : `${countryAndState.country.name} / ${countryAndState.state.name}`}
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
