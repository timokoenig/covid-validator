import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { app, setPurpose } from '../../../state/app'
import { Purpose } from '../../../utils/models'
import purpose from '../../../utils/purpose'
import PurposeList from './purpose-list'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const PurposeModal = (props: Props) => {
  const { t } = useTranslation('common')
  const appState = app.use()
  const [selection, setSelection] = useState<Purpose>(
    purpose(t).find(item => item.title == appState.purpose) ?? purpose(t)[0]
  )

  const onSave = () => {
    setPurpose(selection.title)
    props.onClose()
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('modal.purpose')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <PurposeList items={purpose(t)} selectedItem={selection} onChange={setSelection} />
        </ModalBody>

        <ModalFooter>
          <Button
            size="lg"
            variant="ghost"
            color="white"
            backgroundColor="blue.400"
            _hover={{ bg: 'blue.300' }}
            _active={{ bg: 'blue.400' }}
            mr={3}
            onClick={onSave}
          >
            {t('save')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default PurposeModal
