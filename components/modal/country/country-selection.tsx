import {
  Button,
  Heading,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import BoxShadow from './box-shadow'
import CountryList from './country-list'
import CustomRuleList from './custom-rule-list'

type Props = {
  selection: { country: string; state: string }
  setSelection: (selection: { country: string; state: string }) => void
  setConfirm: (confirm: boolean) => void
}

const CountrySelection = (props: Props) => {
  const { t } = useTranslation('common')
  return (
    <ModalContent>
      <ModalHeader>{t('modal.rules')}</ModalHeader>
      <ModalCloseButton />
      <ModalBody position="relative">
        <Heading size="sm" mb="2">
          Custom Rules
        </Heading>
        <CustomRuleList
          selectedItem={props.selection.country}
          onChange={selection => props.setSelection({ country: selection, state: '' })}
        />
        <Heading size="sm" mb="2">
          System Rules
        </Heading>
        <CountryList
          selectedCountry={props.selection.country}
          selectedState={props.selection.state}
          onChange={(country, state) => props.setSelection({ country, state })}
        />
        <BoxShadow />
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={() => props.setConfirm(true)}>
          {t('continue')}
        </Button>
      </ModalFooter>
    </ModalContent>
  )
}

export default CountrySelection
