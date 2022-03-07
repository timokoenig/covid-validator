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
import React from 'react'
import { useTranslation } from 'react-i18next'
import { app } from '../../state/app'
import { CertLogic, Language, Rule } from '../../utils/certlogic'
import { getCountryAndState } from '../../utils/helper'
import BoxShadow from './country/box-shadow'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const RulesModal = (props: Props) => {
  const { t } = useTranslation('common')
  const certLogic = new CertLogic()
  const appState = app.use()
  const countryAndState = getCountryAndState(
    useTranslation('country').t,
    appState.country,
    appState.state
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
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="lg" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {countryAndState.state.code === ''
            ? `${countryAndState.country.name}`
            : `${countryAndState.country.name} / ${countryAndState.state.name}`}
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
