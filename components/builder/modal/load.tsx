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
  Text,
} from '@chakra-ui/react'
import React from 'react'
// import { useTranslation } from 'react-i18next'
import { builder } from '../../../state/builder'

type Props = {
  isOpen: boolean
  onClose: () => void
  onClick: (rule: string) => void
}

const LoadModal = (props: Props) => {
  // const { t } = useTranslation('common')
  const builderState = builder.use()

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="lg" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Load Custom Rule</ModalHeader>
        <ModalCloseButton onClick={props.onClose} />
        <ModalBody>
          <List>
            {builderState.rules.length === 0 && <Text>No custom rules available</Text>}
            {builderState.rules.map(rule => (
              <ListItem key={rule} display="flex">
                <Button
                  variant="ghost"
                  flex="1"
                  justifyContent="left"
                  onClick={() => props.onClick(rule)}
                >
                  {rule}
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

export default LoadModal
