import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Text,
} from '@chakra-ui/react'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const OnboardingModal = (props: Props) => {
  const onSave = () => {
    localStorage.setItem('onboarding', 'true')
    props.onClose()
  }

  return (
    <Modal isOpen={props.isOpen} onClose={() => {}} size="lg" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Covid Check</ModalHeader>
        <ModalBody>
          <Text>Placeholder text for onboarding</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onSave}>
            Accept
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default OnboardingModal
