import {
  Box,
  Button,
  Center,
  Heading,
  ModalBody,
  ModalContent,
  ModalFooter,
  Text,
} from '@chakra-ui/react'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { increaseCounter } from '../../../state/app'
import { ScanResult } from '../../../utils/dcc'
import RuleView from './rule-view'

type Props = {
  isOpen: boolean
  onClose: (multiscan: boolean) => void
  result: ScanResult
}

const ResultValid = (props: Props) => {
  const { t } = useTranslation('common')
  const dgc = props.result.certificates[0].dcc.data.payload.hcert.dgc
  const name = `${dgc.nam.gn} ${dgc.nam.fn}` // TODO show gnt and fnt as a fallback
  const birthdate = dgc.dob ? moment(dgc.dob).format('MM.DD.YYYY') : 'XX.XX.XXXX'

  useEffect(() => {
    // increase counter for valid certificate
    increaseCounter()
  }, [])

  return (
    <ModalContent overflow="hidden" bg="green.400">
      <ModalBody mb="5">
        <Center px="10" pt="10">
          <Heading color="white" textAlign="center">
            {t('modal.result.valid')}
          </Heading>
        </Center>
        <Center px="10" pb="10">
          <RuleView />
        </Center>
        <Center display="flex" flexDirection="row">
          <Box px="5">
            <Text fontWeight="semibold" fontSize="xl" color="white">
              {t('modal.result.name')}
            </Text>
            <Text fontWeight="semibold" fontSize="xl" color="white">
              {t('modal.result.birthdate')}
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
        <Text color="white">
          <Text as="span" fontWeight="semibold">
            {props.result.certificates[props.result.certificates.length - 1].ruleValidation?.results
              .length ?? 0}{' '}
          </Text>
          {t('modal.result.rulecount')}
        </Text>
        <Box flex="1" />
        <Button
          size="lg"
          variant="outline"
          color="white"
          backgroundColor="green.400"
          _hover={{ bg: 'green.300' }}
          _active={{ bg: 'green.400' }}
          onClick={() => props.onClose(false)}
        >
          {t('close')}
        </Button>
      </ModalFooter>
    </ModalContent>
  )
}

export default ResultValid
