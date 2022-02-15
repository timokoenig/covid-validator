import {
  Button,
  Checkbox,
  List,
  ListItem,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import tests from '../../../../utils/tests'

type Props = {
  onClose: () => void
  onClick: (items: string[]) => void
}

const VaccineSelection = (props: Props) => {
  const [selectedTests, setSelectedTests] = useState<string[]>([])
  const { t } = useTranslation('common')

  return (
    <ModalContent>
      <ModalHeader>{t('builder.modal.test')}</ModalHeader>
      <ModalCloseButton onClick={props.onClose} />
      <ModalBody>
        <List>
          {tests.map(item => (
            <ListItem key={item.id} display="flex">
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
                  isChecked={selectedTests.includes(item.id)}
                  w="100%"
                  h="100%"
                  p="4"
                  wordBreak="break-all"
                  onChange={e =>
                    e.target.checked
                      ? setSelectedTests([...selectedTests, item.id])
                      : setSelectedTests(selectedTests.filter(v => v !== item.id))
                  }
                >
                  {item.name}
                </Checkbox>
              </Button>
            </ListItem>
          ))}
        </List>
      </ModalBody>

      <ModalFooter>
        <Button colorScheme="blue" onClick={() => props.onClick(selectedTests)}>
          {t('continue')}
        </Button>
      </ModalFooter>
    </ModalContent>
  )
}

export default VaccineSelection
