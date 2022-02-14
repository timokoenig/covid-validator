import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  Button,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
} from '@chakra-ui/react'
import React from 'react'
// import { useTranslation } from 'react-i18next'

type Props = {
  isOpen: boolean
  onClose: () => void
  onClick: (country: string) => void
}

const LanguageModal = (props: Props) => {
  // const { t } = useTranslation('common')

  const languages = [
    { lang: 'de', desc: 'German' },
    // { lang: 'en', desc: 'English' },
  ]

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="lg" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select Language</ModalHeader>
        <ModalCloseButton onClick={props.onClose} />
        <ModalBody>
          <List>
            {languages.map(lang => (
              <ListItem key={lang.lang} display="flex">
                <Button
                  variant="ghost"
                  flex="1"
                  justifyContent="left"
                  onClick={() => props.onClick(lang.lang)}
                >
                  {lang.desc}
                  <Spacer />
                  <ChevronRightIcon width="5" height="5" />
                </Button>
              </ListItem>
            ))}
          </List>
        </ModalBody>

        <ModalFooter />
      </ModalContent>
    </Modal>
  )
}

export default LanguageModal
