import React from 'react'
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
} from '@chakra-ui/react'
import { VerificationResult } from 'dcc-decoder'

type Props = {
  isOpen: boolean
  onClose: () => void
  result?: VerificationResult | undefined
}

const ResultModal = (props: Props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Result Modal</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{props.result?.cert?.nam.gn + '' + props.result?.cert?.nam.fn}</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={props.onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ResultModal
