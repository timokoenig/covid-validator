import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from '@chakra-ui/react'
import React from 'react'
// import { useTranslation } from 'react-i18next'

type Props = {
  type: string
  vaccines: string[]
  tests: string[]
  onClose: () => void
}

const RuleSelection = (props: Props) => {
  // const { t } = useTranslation('common')

  return (
    <ModalContent>
      <ModalHeader>Select Rules</ModalHeader>
      <ModalCloseButton onClick={props.onClose} />
      <ModalBody>
        <Text>{props.type}</Text>
        <Text>{props.vaccines}</Text>
        <Text>{props.tests}</Text>
        {/* <List>
          {items.map(item => (
            <ListItem key={item} display="flex">
              <Button
                variant="ghost"
                flex="1"
                justifyContent="left"
                // onClick={() => props.onClick(item)}
              >
                {item}
                <Spacer />
                <ChevronRightIcon width="5" height="5" />
              </Button>
            </ListItem>
          ))}
        </List> */}
      </ModalBody>

      <ModalFooter>
        <Button colorScheme="blue">Save</Button>
      </ModalFooter>
    </ModalContent>
  )
}

export default RuleSelection
