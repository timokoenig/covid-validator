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
} from '@chakra-ui/react'
import CountryList from './country-list'
import countries from '../utils/countries'

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

  const onSave = () => {
    props.onChange(selection)
    localStorage.setItem('country', selection.country)
    localStorage.setItem('state', selection.state)
    props.onClose()
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="lg">
      <ModalOverlay />
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
          <Button colorScheme="blue" mr={3} onClick={onSave}>
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default RuleModal
