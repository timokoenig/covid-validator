import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  Button,
  List,
  ListItem,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spacer,
} from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  onClose: () => void
  onClick: (item: string) => void
}

const TypeSelection = (props: Props) => {
  const { t } = useTranslation('common')

  const items = ['Vaccination', 'Recovery', 'Test']

  return (
    <ModalContent>
      <ModalHeader>{t('builder.modal.certificate')}</ModalHeader>
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
  )
}

export default TypeSelection
