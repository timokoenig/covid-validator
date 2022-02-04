import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Button,
  Text,
  Center,
  Box,
  Heading,
} from '@chakra-ui/react'
import { VerificationResult } from 'dcc-decoder'
import countries from '../utils/countries'
import purpose from '../utils/purpose'

type Props = {
  isOpen: boolean
  onClose: () => void
  result?: VerificationResult | undefined
}

const RuleView = () => {
  const country =
    countries.find(item => item.code == localStorage.getItem('country')) ?? countries[0]
  const state =
    country?.states.find(item => item.code == localStorage.getItem('state')) ?? country.states[0]
  const currentPurpose = localStorage.getItem('purpose') ?? purpose[0]
  return (
    <Text color="white" fontWeight="semibold">
      {country.name} / {state.name} / {currentPurpose}
    </Text>
  )
}

const ResultModal = (props: Props) => {
  const success = false

  const CertValid = () => (
    <ModalContent overflow="hidden" bg="green.400">
      {/* <ModalCloseButton color="white" /> */}
      <ModalBody mb="5">
        <Center px="10" pt="10">
          <Heading color="white">VALID</Heading>
        </Center>
        <Center px="10" pb="10">
          <RuleView />
        </Center>
        <Center display="flex" flexDirection="row">
          <Box px="5">
            <Text fontWeight="semibold" fontSize="xl" color="white">
              Name
            </Text>
            <Text fontWeight="semibold" fontSize="xl" color="white">
              Birthdate
            </Text>
          </Box>
          <Box px="5">
            <Text fontSize="xl" color="white">
              Timo Koenig
            </Text>
            <Text fontSize="xl" color="white">
              01.01.2000
            </Text>
          </Box>
        </Center>
      </ModalBody>

      <ModalFooter>
        <Button
          size="lg"
          variant="outline"
          color="white"
          backgroundColor={'green.400'}
          _hover={{ bg: 'green.300' }}
          _active={{ bg: 'green.400' }}
          onClick={props.onClose}
        >
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  )

  const CertInvalid = () => (
    <ModalContent overflow="hidden" bg="red.400">
      {/* <ModalCloseButton color="white" /> */}
      <ModalBody mb="5">
        <Center px="10" pt="10">
          <Heading color="white">NOT VALID</Heading>
        </Center>
        <Center px="10">
          <Text color="white" fontWeight="semibold">
            <RuleView />
          </Text>
        </Center>
      </ModalBody>

      <ModalFooter>
        <Button
          size="lg"
          variant="outline"
          color="white"
          backgroundColor={'red.400'}
          _hover={{ bg: 'red.300' }}
          _active={{ bg: 'red.400' }}
          onClick={props.onClose}
        >
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  )

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="lg">
      <ModalOverlay />
      {success ? <CertValid /> : <CertInvalid />}
    </Modal>
  )
}

export default ResultModal
