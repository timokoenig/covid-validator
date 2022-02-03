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
import PurposeList from './purpose-list'
import purpose from '../utils/purpose'

type Props = {
  isOpen: boolean
  onClose: () => void
  onChange: (selection: string) => void
}

const PurposeModal = (props: Props) => {
  const [selection, setSelection] = useState<string>(purpose[0])

  const onSave = () => {
    props.onChange(selection)
    props.onClose()
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select purpose of use</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <PurposeList items={purpose} selectedItem={selection} onChange={setSelection} />
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

export default PurposeModal
