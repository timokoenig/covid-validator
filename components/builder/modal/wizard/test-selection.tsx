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

type Props = {
  onClose: () => void
  onClick: (item: string) => void
}

const VaccineSelection = (props: Props) => {
  const [tests, setTests] = useState<string[]>([])
  // const { t } = useTranslation('common')

  const items = ['PCR', 'Antigen']

  return (
    <ModalContent>
      <ModalHeader>
        Select Test
        <br />
        <Text fontWeight="normal" fontSize="md">
          Subheadling with instructions
        </Text>
      </ModalHeader>
      <ModalCloseButton onClick={props.onClose} />
      <ModalBody>
        <List>
          {items.map(item => (
            <ListItem key={item} display="flex">
              <Button
                isFullWidth
                h="auto"
                position="relative"
                overflowWrap="anywhere"
                whiteSpace="normal"
                variant="ghost"
                justifyContent="left"
                onClick={() =>
                  tests.includes(item)
                    ? setTests(tests.filter(v => v !== item))
                    : setTests([...tests, item])
                }
              >
                <Checkbox
                  isChecked={tests.includes(item)}
                  mr="5"
                  maxW="100%"
                  py="4"
                  wordBreak="break-all"
                  onChange={e =>
                    e.target.checked
                      ? setTests(tests.filter(v => v !== item))
                      : setTests([...tests, item])
                  }
                >
                  {item}
                </Checkbox>
              </Button>
            </ListItem>
          ))}
        </List>
      </ModalBody>

      <ModalFooter>
        <Button colorScheme="blue">Continue</Button>
      </ModalFooter>
    </ModalContent>
  )
}

export default VaccineSelection
