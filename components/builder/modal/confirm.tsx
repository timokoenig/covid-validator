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
// import { useTranslation } from 'react-i18next'

type Props = {
  rule: string
  isOpen: boolean
  onClose: (confirm: boolean) => void
}

const ConfirmModal = (props: Props) => {
  // const { t } = useTranslation('common')

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={() => props.onClose(false)}
      size="lg"
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Are you sure to delete the rule?</ModalHeader>
        <ModalBody>
          <Text>
            The rule{' '}
            <Text as="span" fontWeight="semibold">
              {props.rule}
            </Text>{' '}
            will be deleted irrevocably from your device. It will not delete the rule from other
            devices.
          </Text>
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
