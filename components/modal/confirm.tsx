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
import { useTranslation } from 'react-i18next'

type Props = {
  title: string
  message: string | JSX.Element
  isOpen: boolean
  onClose: (confirm: boolean) => void
}

const ConfirmModal = (props: Props) => {
  const { t } = useTranslation('common')
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
            {t('no')}
          </Button>
          <Button colorScheme="red" mr={3} onClick={() => props.onClose(true)}>
            {t('yes')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmModal
