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
  onClose: (multiscan: boolean) => void
  result: ScanResult | undefined
}

const RuleView = () => {
  const country =
    countries.find(item => item.code == localStorage.getItem('country')) ?? countries[0]
  const state =
    country?.states.find(item => item.code == localStorage.getItem('state')) ?? country.states[0]
  const currentPurpose = localStorage.getItem('purpose') ?? purpose[0].title
  return (
    <Text color="white" fontWeight="semibold">
      {country.name} / {state.name} / {currentPurpose}
    </Text>
  )
}

const ResultModal = (props: Props) => {
  if (props.result === undefined || props.result.certificates.length == 0) return <></>

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
          onClick={() => props.onClose(false)}
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
          onClick={() => props.onClose(props.result?.isMultiScan ?? false)}
        >
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  )

  const CertMultiscan = () => (
    <ModalContent overflow="hidden" bg="blue.400">
      {/* <ModalCloseButton color="white" /> */}
      <ModalBody mb="5">
        <Center px="10" pt="10">
          <Heading color="white">TEST CERTIFICATE REQUIRED</Heading>
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
          backgroundColor={'blue.400'}
          _hover={{ bg: 'blue.300' }}
          _active={{ bg: 'blue.400' }}
          onClick={() => props.onClose(true)}
        >
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  )

  const CertTechnicallyInvalid = () => (
    <ModalContent overflow="hidden" bg="gray.400">
      {/* <ModalCloseButton color="white" /> */}
      <ModalBody mb="5">
        <Center px="10" pt="10">
          <Heading color="white">NOT VALID TECHNICALLY</Heading>
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
          backgroundColor={'gray.400'}
          _hover={{ bg: 'gray.300' }}
          _active={{ bg: 'gray.400' }}
          onClick={() => props.onClose(props.result?.isMultiScan ?? false)}
        >
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  )

  const Body = () => {
    if (props.result === undefined) return <></>

    const verificationFailed = props.result.certificates.find(cert => cert.verification === false)
    if (verificationFailed !== undefined) {
      return <CertTechnicallyInvalid />
    }

    const ruleValidationFailed = props.result.certificates.find(
      cert => cert.ruleValidation?.isValid === false
    )
    if (ruleValidationFailed !== undefined) {
      return <CertInvalid />
    }

    if (props.result?.isMultiScan && props.result.certificates.length == 1) {
      return <CertMultiscan />
    }

    return <CertValid />
  }

  return (
    <Modal isOpen={props.isOpen} onClose={() => {}} size="lg">
      <ModalOverlay />
      <Body />
    </Modal>
  )
}

export default ResultModal
