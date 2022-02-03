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
}

const RuleModal = (props: Props) => {
  const [selection, setSelection] = useState<{ country: string; state: string }>({
    country: 'de',
    state: '',
  })

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
          <Button colorScheme="blue" mr={3} onClick={props.onClose}>
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default RuleModal
