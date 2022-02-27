import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spacer,
} from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

const IfBody = (props: { onClose: () => void; onDelete: () => void }) => {
  const { t } = useTranslation('common')
  return (
    <ModalContent>
      <ModalHeader>{t('builder.if')}</ModalHeader>
      <ModalCloseButton onClick={props.onClose} />
      <ModalBody />
      <ModalFooter>
        <Button variant="ghost" colorScheme="red" onClick={props.onDelete}>
          {t('delete')}
        </Button>
        <Spacer />
      </ModalFooter>
    </ModalContent>
  )
}

export default IfBody
