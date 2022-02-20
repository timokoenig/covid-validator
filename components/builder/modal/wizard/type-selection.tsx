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
import { CERTIFICATE_TYPE_ALL } from '../../../../utils/builder/types'
import ListItem from '../../../list-item'

type Props = {
  onClose: () => void
  onClick: (item: string) => void
}

const TypeSelection = (props: Props) => {
  const { t } = useTranslation('common')
  return (
    <ModalContent>
      <ModalHeader>{t('builder.modal.certificate')}</ModalHeader>
      <ModalCloseButton onClick={props.onClose} />
      <ModalBody>
        <List>
          {CERTIFICATE_TYPE_ALL.map(item => (
            <ListItem key={item} title={item} onClick={() => props.onClick(item)} />
          ))}
        </List>
      </ModalBody>

      <ModalFooter />
    </ModalContent>
  )
}

export default TypeSelection
