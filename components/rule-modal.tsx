import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
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
import countries from '../utils/countries'
import rules from '../utils/eu-dcc-rules.json'
import { Rules, Rule, Language } from '../utils/certlogic'
import CountryList from './country-list'

type RuleSelectionProps = {
  selection: { country: string; state: string }
  setSelection: (selection: { country: string; state: string }) => void
  setConfirm: (confirm: boolean) => void
}

const RuleSelection = (props: RuleSelectionProps) => {
  const { t } = useTranslation('common')
  return (
    <ModalContent>
      <ModalHeader>{t('modal.rules')}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <CountryList
          items={countries}
          selectedCountry={props.selection.country}
          selectedState={props.selection.state}
          onChange={(country, state) => props.setSelection({ country, state })}
        />
      </ModalBody>

      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={() => props.setConfirm(true)}>
          {t('continue')}
        </Button>
      </ModalFooter>
    </ModalContent>
  )
}

type RuleConfirmationProps = {
  selection: { country: string; state: string }
  setConfirm: (confirm: boolean) => void
  onSave: () => void
}

const RuleConfirmation = (props: RuleConfirmationProps) => {
  const { t } = useTranslation('common')
  const country = countries.find(item => item.code == props.selection.country) ?? countries[0]
  const state = country.states.find(item => item.code == props.selection.state) ?? country.states[0]

  const preferredLanguage = localStorage.getItem('lang') ?? 'en'
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
  const vRuleDescriptions = countryRules
    .filter(rule => rule.CertificateType == 'Vaccination')
    .map(mapLanguage)
  const rRuleDescriptions = countryRules
    .filter(rule => rule.CertificateType == 'Recovery')
    .map(mapLanguage)
  const tRuleDescriptions = countryRules
    .filter(rule => rule.CertificateType == 'Test')
    .map(mapLanguage)

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
        {vRuleDescriptions.length > 0 && (
          <Box>
            <Text fontWeight="semibold">{t('vaccination')}</Text>
            <UnorderedList>
              {vRuleDescriptions.map(desc => (
                <ListItem mb="2" key={desc?.desc ?? ''}>
                  {desc ? desc.desc : 'n/a'}
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
        )}
        {rRuleDescriptions.length > 0 && (
          <Box>
            <Text fontWeight="semibold">{t('recovery')}</Text>
            <UnorderedList>
              {rRuleDescriptions.map(desc => (
                <ListItem mb="2" key={desc?.desc ?? ''}>
                  {desc ? desc.desc : 'n/a'}
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
        )}
        {tRuleDescriptions.length > 0 && (
          <Box>
            <Text fontWeight="semibold">{t('test')}</Text>
            <UnorderedList>
              {tRuleDescriptions.map(desc => (
                <ListItem mb="2" key={desc?.desc ?? ''}>
                  {desc ? desc.desc : 'n/a'}
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
        )}
      </ModalBody>

      <ModalFooter>
        <Button
          size="lg"
          variant="outline"
          backgroundColor="transparent"
          _hover={{ bg: 'gray.600' }}
          _active={{ bg: 'gray.800' }}
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

type Props = {
  isOpen: boolean
  onClose: () => void
  onChange: (selection: { country: string; state: string }) => void
}

const RuleModal = (props: Props) => {
  const [selection, setSelection] = useState<{ country: string; state: string }>({
    country: localStorage.getItem('country') ?? 'DE',
    state: localStorage.getItem('state') ?? '',
  })
  const [confirm, setConfirm] = useState<boolean>(false)

  const onClose = () => {
    setConfirm(false)
    props.onClose()
  }

  const onSave = () => {
    props.onChange(selection)
    localStorage.setItem('country', selection.country)
    localStorage.setItem('state', selection.state)
    setConfirm(false)
    props.onClose()
  }

  return (
    <Modal isOpen={props.isOpen} onClose={onClose} size="lg" scrollBehavior="inside">
      <ModalOverlay />
      {confirm ? (
        <RuleConfirmation selection={selection} setConfirm={setConfirm} onSave={onSave} />
      ) : (
        <RuleSelection selection={selection} setSelection={setSelection} setConfirm={setConfirm} />
      )}
    </Modal>
  )
}

export default RuleModal
