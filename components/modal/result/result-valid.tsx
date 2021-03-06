/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
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
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { increaseCounter } from '../../../state/app'
import { DigitalGreenCertificate } from '../../../utils/dcc'
import { dislpayName } from '../../../utils/helper'
import { ScanResult } from '../../card/camera-scan-view'
import RuleView from './rule-view'

const CLOSE_MODAL_TIMEOUT_SECONDS = 30

type Props = {
  isOpen: boolean
  onClose: (multiscan: boolean) => void
  result: ScanResult
  enableCounter?: boolean
  enableTimer?: boolean
}

const ResultValid = (props: Props) => {
  const { t } = useTranslation('common')
  const [timer, setTimer] = useState<number>(CLOSE_MODAL_TIMEOUT_SECONDS)

  // Show additional information if we have scanned two certificates from different people
  const showAdditionalInfos = ((): boolean => {
    if (props.result.certificates.length == 1) return false
    const name1 = dislpayName(props.result.certificates[0].data.payload.hcert.dgc.nam)
    const name2 = dislpayName(props.result.certificates[1].data.payload.hcert.dgc.nam)
    return name1 !== name2
  })()

  useEffect(() => {
    if (props.enableCounter === false) return
    // increase counter for valid certificate
    increaseCounter()
  }, [])

  useEffect(() => {
    if (props.enableTimer === false) return
    // Set timeout interval to close modal after X seconds
    const interval = setInterval(() => {
      const newTimer = timer - 1
      setTimer(timer - 1)
      if (newTimer > 0) return
      props.onClose(false)
    }, 1000)
    return () => clearInterval(interval)
  }, [timer])

  const Data = (dataProps: { dgc: DigitalGreenCertificate }): JSX.Element => {
    const name = dislpayName(dataProps.dgc.nam)
    const birthdate = dataProps.dgc.dob
      ? moment(dataProps.dgc.dob).format('DD.MM.YYYY')
      : 'XX.XX.XXXX'
    return (
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
    )
  }

  return (
    <ModalContent overflow="hidden" bg="green.400">
      <ModalBody mb="5">
        <Center px="10" pt="10">
          <Heading color="white" textAlign="center">
            {t('modal.result.valid')}
            {showAdditionalInfos && ' *'}
          </Heading>
        </Center>
        <Center px="10" pb="10">
          <RuleView />
        </Center>
        <Data dgc={props.result.certificates[0].data.payload.hcert.dgc} />
        {showAdditionalInfos && (
          <>
            <Text textAlign="center" color="white" fontSize="lg" my="5">
              * {t('modal.result.valid.mismatch')}
            </Text>
            <Data dgc={props.result.certificates[1].data.payload.hcert.dgc} />
          </>
        )}
      </ModalBody>

      <ModalFooter>
        <Button
          size="lg"
          variant="outline"
          color="white"
          backgroundColor="green.400"
          _hover={{ bg: 'green.300' }}
          _active={{ bg: 'green.400' }}
          onClick={() => props.onClose(false)}
        >
          {t('close')} ({timer.toString()})
        </Button>
      </ModalFooter>
    </ModalContent>
  )
}

export default ResultValid
