import {
  Button,
  Checkbox,
  List,
  ListItem as ChakraListItem,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spacer,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IMMUNIZATION_STATUS_ALL } from '../../../../utils/builder/types'
import vaccines from '../../../../utils/vaccines'
import ListItem from '../../../list-item'

const ImmunizationStatusBody = (props: {
  editMode: boolean
  onClose: () => void
  onClick: (status: string, vaccines: string[]) => void
  onDelete: () => void
}) => {
  const { t } = useTranslation('common')
  const [status, setStatus] = useState<string>('')
  const [selectedVaccines, setSelectedVaccines] = useState<string[]>([])
  return (
    <ModalContent>
      <ModalHeader>{t('builder.immunizationstatus')}</ModalHeader>
      <ModalCloseButton onClick={props.onClose} />
      <ModalBody>
        {status === '' ? (
          <List>
            {IMMUNIZATION_STATUS_ALL.map(item => (
              <ListItem key={item} title={t(item)} onClick={() => setStatus(item)} />
            ))}
          </List>
        ) : (
          <List>
            {vaccines.map(item => (
              <ChakraListItem key={item.id} display="flex">
                <Button
                  isFullWidth
                  h="auto"
                  position="relative"
                  overflowWrap="anywhere"
                  whiteSpace="normal"
                  variant="ghost"
                  justifyContent="left"
                  p="0"
                >
                  <Checkbox
                    isChecked={selectedVaccines.includes(item.id)}
                    w="100%"
                    h="100%"
                    p="4"
                    wordBreak="break-all"
                    onChange={e =>
                      e.target.checked
                        ? setSelectedVaccines([...selectedVaccines, item.id])
                        : setSelectedVaccines(selectedVaccines.filter(v => v !== item.id))
                    }
                  >
                    {item.name}
                  </Checkbox>
                </Button>
              </ChakraListItem>
            ))}
          </List>
        )}
      </ModalBody>
      <ModalFooter>
        {props.editMode && (
          <Button variant="ghost" colorScheme="red" onClick={props.onDelete}>
            {t('delete')}
          </Button>
        )}
        <Spacer />
        {status !== '' && (
          <Button onClick={() => props.onClick(status, selectedVaccines)}>{t('done')}</Button>
        )}
      </ModalFooter>
    </ModalContent>
  )
}

export default ImmunizationStatusBody
