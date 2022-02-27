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
import RuleView from './rule-view'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const ResultTechnicallyInvalid = (props: Props) => {
  const { t } = useTranslation('common')
  return (
    <ModalContent overflow="hidden" bg="gray.400">
      <ModalBody mb="5">
        <Center px="10" pt="10" textAlign="center">
          <Heading color="white">{t('modal.result.technicallyinvalid')}</Heading>
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
          backgroundColor="gray.400"
          _hover={{ bg: 'gray.300' }}
          _active={{ bg: 'gray.400' }}
          onClick={props.onClose}
        >
          {t('close')}
        </Button>
      </ModalFooter>
    </ModalContent>
  )
}

export default ResultTechnicallyInvalid
