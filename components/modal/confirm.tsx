import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import React from 'react'

type Props = {
  title: string
  message: string | JSX.Element
  isOpen: boolean
  onClose: (confirm: boolean) => void
}

const ConfirmModal = (props: Props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={() => props.onClose(false)}
      size="lg"
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.title}</ModalHeader>
        <ModalBody>
          {typeof props.message === 'string' ? <Text>{props.message}</Text> : props.message}
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={() => props.onClose(false)}>
            No
          </Button>
          <Button colorScheme="red" mr={3} onClick={() => props.onClose(true)}>
            Yes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmModal
