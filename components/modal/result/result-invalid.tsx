import React from 'react'
import {
  ModalContent,
  ModalFooter,
  ModalBody,
  Button,
  Text,
  Center,
  Box,
  Heading,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { ScanResult } from '../../../utils/dcc'
import RuleView from './rule-view'

type Props = {
  isOpen: boolean
  onClose: (multiscan: boolean) => void
  result: ScanResult
}

const ResultInvalid = (props: Props) => {
  const { t } = useTranslation('common')
  return (
    <ModalContent overflow="hidden" bg="red.400">
      <ModalBody mb="5">
        <Center px="10" pt="10">
          <Heading color="white" textAlign="center">
            {t('modal.result.notvalid')}
          </Heading>
        </Center>
        <Center px="10">
          <Text color="white" fontWeight="semibold">
            <RuleView />
          </Text>
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
          backgroundColor="red.400"
          _hover={{ bg: 'red.300' }}
          _active={{ bg: 'red.400' }}
          onClick={() => props.onClose(props.result.isMultiScan)}
        >
          {t('close')}
        </Button>
      </ModalFooter>
    </ModalContent>
  )
}

export default ResultInvalid
