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
import countries from '../utils/countries'
import purpose from '../utils/purpose'
import { ScanResult } from '~/utils/dcc'
import moment from 'moment'

type Props = {
  isOpen: boolean
  onClose: () => void
  result: ScanResult | undefined
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
  if (props.result === undefined) return <></>

  const notValid = props.result.certificates.find(
    cert => cert.verification === false || cert.ruleValidation?.isValid === false
  )

  const dgc = props.result.certificates[0].dcc.data.payload.hcert.dgc
  const name = dgc.nam.gn + ' ' + dgc.nam.fn
  const birthdate = dgc.dob ? moment(dgc.dob).format('MM.DD.YYYY') : 'XX.XX.XXXX'

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
              {name}
            </Text>
            <Text fontSize="xl" color="white">
              {birthdate}
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
      {notValid ? <CertInvalid /> : <CertValid />}
    </Modal>
  )
}

export default ResultModal
