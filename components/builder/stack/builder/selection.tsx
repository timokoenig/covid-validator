import {
  Heading,
  List,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import ListItem from '../../../list-item'
import { MODAL_TYPE_ALL, MODAL_TYPE_CUSTOM_ALL } from './types'

const SelectionBody = (props: { onClose: () => void; onClick: (selection: string) => void }) => {
  const { t } = useTranslation('common')
  return (
    <ModalContent>
      <ModalHeader>{t('builder.select.component')}</ModalHeader>
      <ModalCloseButton onClick={props.onClose} />
      <ModalBody>
        <Heading size="md">{t('builder.select.custom')}</Heading>
        <List mb="5">
          {MODAL_TYPE_CUSTOM_ALL.map(type => (
            <ListItem key={type} title={type} onClick={() => props.onClick(type)} />
          ))}
        </List>
        <Heading size="md">{t('builder.select.default')}</Heading>
        <List>
          {MODAL_TYPE_ALL.map(type => (
            <ListItem key={type} title={type} onClick={() => props.onClick(type)} />
          ))}
        </List>
      </ModalBody>
      <ModalFooter />
    </ModalContent>
  )
}

export default SelectionBody
