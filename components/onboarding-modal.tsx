import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Text,
  Checkbox,
  Link,
  ListItem,
  Heading,
  UnorderedList,
  Box,
} from '@chakra-ui/react'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const OnboardingModal = (props: Props) => {
  const [accepted, setAccepted] = useState<boolean>(false)
  const onSave = () => {
    localStorage.setItem('onboarding', 'true')
    props.onClose()
  }

  return (
    <Modal isOpen={props.isOpen} onClose={() => {}} size="lg" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Covid Validator</ModalHeader>
        <ModalBody>
          <Text>
            Covid Validator allows you to scan and validate <b>EU Digital Covid Certificates </b>
            based on country or local rules. The scan and validation process happens locally in your
            browser.
          </Text>
          <Heading size="sm" mt="5">
            The website
          </Heading>
          <UnorderedList>
            <ListItem>does not save any personal information</ListItem>
            <ListItem>does not share any information with others</ListItem>
            <ListItem>
              does not use any cookies (required data is saved in your browsers local storage)
            </ListItem>
            <ListItem>
              is Open Source and can be found on
              <Link
                href="http://github.com/timokoenig/covid-validator"
                target="_blank"
                style={{ textDecoration: 'underline' }}
                mx="1"
              >
                Github
              </Link>
            </ListItem>
            <ListItem>
              is hosted in Germany by
              <Link
                href="https://www.hetzner.com/"
                target="_blank"
                style={{ textDecoration: 'underline' }}
                mx="1"
              >
                Hetzner Online GmbH
              </Link>
            </ListItem>
          </UnorderedList>

          <Box my="5">
            <Link href="/privacy" target="_blank" style={{ textDecoration: 'underline' }}>
              Read more about the Privacy Policy
            </Link>
          </Box>

          <Button isFullWidth onClick={() => setAccepted(!accepted)}>
            <Checkbox isChecked={accepted} mr="5" />
            <Text>I agree to the Privacy Policy</Text>
          </Button>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onSave} isDisabled={!accepted}>
            Continue
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default OnboardingModal
