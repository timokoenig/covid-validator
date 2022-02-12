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
  onClick: (item: string) => void
}

const TypeSelectionModal = (props: Props) => {
  // const { t } = useTranslation('common')

  const items = ['Vaccination', 'Recovery', 'Test']

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="lg" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select Certificate Type</ModalHeader>
        <ModalCloseButton onClick={props.onClose} />
        <ModalBody>
          <List>
            {items.map(item => (
              <ListItem key={item} display="flex">
                <Button
                  variant="ghost"
                  flex="1"
                  justifyContent="left"
                  onClick={() => props.onClick(item)}
                >
                  {item}
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

export default TypeSelectionModal
