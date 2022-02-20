import {
  List,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { IMMUNIZATION_STATUS_ALL } from '../../../../utils/builder/types'
import ListItem from '../../../list-item'

type Props = {
  onClose: () => void
  onSelect: (selection: string) => void
}

const TypeSelection = (props: Props) => {
  const { t } = useTranslation('common')
  return (
    <ModalContent>
      <ModalHeader>{t('builder.modal.type')}</ModalHeader>
      <ModalCloseButton onClick={props.onClose} />
      <ModalBody>
        <List>
          {IMMUNIZATION_STATUS_ALL.map(item => (
            <ListItem key={item} title={t(item)} onClick={() => props.onSelect(item)} />
          ))}
        </List>
      </ModalBody>
      <ModalFooter />
    </ModalContent>
  )
}

export default TypeSelection
