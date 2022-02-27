import {
  Button,
  Center,
  Heading,
  ModalBody,
  ModalContent,
  ModalFooter,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ScanResult } from '../../card/camera-scan-view'
import RuleView from './rule-view'

type Props = {
  isOpen: boolean
  onClose: () => void
  result: ScanResult
}

const ResultMultiscan = (props: Props) => {
  const { t } = useTranslation('common')
  return (
    <ModalContent overflow="hidden" bg="orange.400">
      <ModalBody mb="5">
        <Center px="10" pt="10">
          <Heading color="white" textAlign="center">
            {`${props.result.multiscan
              .map(s => t(`certificate.${s.toLowerCase()}`))
              .join(` ${t('or')} `)} ${t('required')}`}
          </Heading>
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
          backgroundColor="orange.400"
          _hover={{ bg: 'orange.300' }}
          _active={{ bg: 'orange.400' }}
          onClick={props.onClose}
        >
          {t('modal.result.scannext')}
        </Button>
      </ModalFooter>
    </ModalContent>
  )
}

export default ResultMultiscan
