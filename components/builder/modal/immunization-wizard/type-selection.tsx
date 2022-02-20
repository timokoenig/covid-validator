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
import {
  IMMUNIZATION_STATUS_BOOSTER,
  IMMUNIZATION_STATUS_FULL,
  IMMUNIZATION_STATUS_FULL_RECOVERY,
  IMMUNIZATION_STATUS_PARTIAL,
} from '~/utils/builder/types'

type Props = {
  onClose: () => void
  onSelect: (selection: string) => void
}

const TypeSelection = (props: Props) => {
  const { t } = useTranslation('common')

  const items = [
    IMMUNIZATION_STATUS_PARTIAL,
    IMMUNIZATION_STATUS_FULL,
    IMMUNIZATION_STATUS_FULL_RECOVERY,
    IMMUNIZATION_STATUS_BOOSTER,
  ]

  return (
    <ModalContent>
      <ModalHeader>{t('builder.modal.type')}</ModalHeader>
      <ModalCloseButton onClick={props.onClose} />
      <ModalBody>
        <List>
          {items.map(item => (
            <ListItem key={item} display="flex">
              <Button
                variant="ghost"
                flex="1"
                justifyContent="left"
                onClick={() => props.onSelect(item)}
              >
                {t(item)}
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
