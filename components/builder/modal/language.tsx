import {
  List,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import ListItem from '../../list-item'

type Props = {
  isOpen: boolean
  onClose: () => void
  onClick: (country: string) => void
}

const LanguageModal = (props: Props) => {
  const { t } = useTranslation('common')

  // TODO add more languages
  const languages = [{ lang: 'de', desc: 'German' }]

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="lg" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('builder.modal.language')}</ModalHeader>
        <ModalCloseButton onClick={props.onClose} />
        <ModalBody>
          <List>
            {languages.map(lang => (
              <ListItem
                key={lang.lang}
                title={lang.desc}
                onClick={() => props.onClick(lang.lang)}
              />
            ))}
          </List>
        </ModalBody>

        <ModalFooter />
      </ModalContent>
    </Modal>
  )
}

export default LanguageModal
