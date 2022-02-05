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
import CountryList from './country-list'
import countries from '../utils/countries'
import rules from '../utils/eu-dcc-rules.json'
import { Rules, Rule } from '../utils/certlogic'

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

  const onSave = () => {
    props.onChange(selection)
    localStorage.setItem('country', selection.country)
    localStorage.setItem('state', selection.state)
    props.onClose()
  }

  const RuleSelection = () => (
    <ModalContent>
      <ModalHeader>Select Country and Rules</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <CountryList
          items={countries}
          selectedCountry={selection.country}
          selectedState={selection.state}
          onChange={(country, state) => setSelection({ country: country, state: state })}
        />
      </ModalBody>

      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={() => setConfirm(true)}>
          Continue
        </Button>
      </ModalFooter>
    </ModalContent>
  )

  const RuleConfirmation = () => {
    const country = countries.find(item => item.code == selection.country) ?? countries[0]
    const state = country?.states.find(item => item.code == selection.state) ?? country.states[0]

    const preferredLanguage = localStorage.getItem('lang') ?? 'en'
    // TODO filter rules and show only currently valid rules
    const countryRules: Rule[] = (rules as Rules).rules.filter(rule => rule.Country == country.code)
    const ruleDescriptions = countryRules
      .map(rule => {
        if (rule.Description.length == 0) return null
        return (
          rule.Description.find(
            desc => desc.lang.toLowerCase() == preferredLanguage.toLowerCase()
          ) ??
          rule.Description.find(desc => desc.lang.toLowerCase() == 'en') ??
          rule.Description[0]
        )
      })
      .filter(lang => lang != null)
    return (
      <ModalContent>
        <ModalHeader>
          {country.name} / {state.name}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight="semibold" mb="5">
            Please confirm that these rules meet your requirements
          </Text>
          <UnorderedList>
            {ruleDescriptions.map(desc => (
              <ListItem mb="2">{desc ? desc.desc : 'n/a'}</ListItem>
            ))}
          </UnorderedList>
        </ModalBody>

        <ModalFooter>
          <Button
            size="lg"
            variant="outline"
            color="white"
            backgroundColor={'transparent'}
            _hover={{ bg: 'gray.600' }}
            _active={{ bg: 'gray.800' }}
            mr={3}
            onClick={() => setConfirm(false)}
          >
            Back
          </Button>
          <Box flex="1" />
          <Button
            size="lg"
            variant="ghost"
            color="white"
            backgroundColor={'blue.400'}
            _hover={{ bg: 'blue.300' }}
            _active={{ bg: 'blue.400' }}
            mr={3}
            onClick={onSave}
          >
            Confirm Selection
          </Button>
        </ModalFooter>
      </ModalContent>
    )
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="lg" scrollBehavior="inside">
      <ModalOverlay />
      {confirm ? <RuleConfirmation /> : <RuleSelection />}
    </Modal>
  )
}

export default RuleModal
