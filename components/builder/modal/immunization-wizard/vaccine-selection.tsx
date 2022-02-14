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
  Text,
} from '@chakra-ui/react'
import React, { useState } from 'react'
// import { useTranslation } from 'react-i18next'
import vaccines from '../../../../utils/vaccines'

type Props = {
  onClose: () => void
  onClick: (selected: string[]) => void
}

const VaccineSelection = (props: Props) => {
  const [selectedVaccines, setSelectedVaccines] = useState<string[]>([])
  // const { t } = useTranslation('common')

  return (
    <ModalContent>
      <ModalHeader>
        Select Vaccine
        <br />
        <Text fontWeight="normal" fontSize="md">
          Subheadling with instructions
        </Text>
      </ModalHeader>
      <ModalCloseButton onClick={props.onClose} />
      <ModalBody>
        <List>
          {vaccines.map(item => (
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
            </ListItem>
          ))}
        </List>
      </ModalBody>

      <ModalFooter>
        <Button colorScheme="blue" onClick={() => props.onClick(selectedVaccines)}>
          Continue
        </Button>
      </ModalFooter>
    </ModalContent>
  )
}

export default VaccineSelection
