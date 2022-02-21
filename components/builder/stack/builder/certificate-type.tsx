import {
  Button,
  List,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spacer,
} from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { CERTIFICATE_TYPE_ALL } from '../../../../utils/builder/types'
import ListItem from '../../../list-item'

const CertificateTypeBody = (props: {
  editMode: boolean
  onClose: () => void
  onClick: (selection: string) => void
  onDelete: () => void
}) => {
  const { t } = useTranslation('common')
  return (
    <ModalContent>
      <ModalHeader>{t('builder.certificatetype')}</ModalHeader>
      <ModalCloseButton onClick={props.onClose} />
      <ModalBody>
        <List>
          {CERTIFICATE_TYPE_ALL.map(type => (
            <ListItem key={type} title={type} onClick={() => props.onClick(type)} />
          ))}
        </List>
      </ModalBody>
      <ModalFooter>
        {props.editMode && (
          <Button variant="ghost" colorScheme="red" onClick={props.onDelete}>
            {t('delete')}
          </Button>
        )}
        <Spacer />
      </ModalFooter>
    </ModalContent>
  )
}

export default CertificateTypeBody
