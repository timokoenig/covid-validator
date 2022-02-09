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
import { useTranslation } from 'react-i18next'
import purpose from '../../../utils/purpose'
import { Purpose } from '../../../utils/models'
import PurposeList from './purpose-list'

type Props = {
  isOpen: boolean
  onClose: () => void
  onChange: (selection: string) => void
}

const PurposeModal = (props: Props) => {
  const { t } = useTranslation('common')
  const [selection, setSelection] = useState<Purpose>(
    purpose.find(item => item.title == localStorage.getItem('purpose')) ?? purpose[0]
  )

  const onSave = () => {
    props.onChange(selection.title)
    localStorage.setItem('purpose', selection.title)
    props.onClose()
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('modal.purpose')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <PurposeList items={purpose} selectedItem={selection} onChange={setSelection} />
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
