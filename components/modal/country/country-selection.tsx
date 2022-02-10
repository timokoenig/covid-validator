import React from 'react'
import {
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import CountryList from './country-list'
import BoxShadow from './box-shadow'

type Props = {
  selection: { country: string; state: string }
  setSelection: (selection: { country: string; state: string }) => void
  setConfirm: (confirm: boolean) => void
}

const RuleSelection = (props: Props) => {
  const { t } = useTranslation('common')
  return (
    <ModalContent>
      <ModalHeader>{t('modal.rules')}</ModalHeader>
      <ModalCloseButton />
      <ModalBody position="relative">
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

export default RuleSelection
