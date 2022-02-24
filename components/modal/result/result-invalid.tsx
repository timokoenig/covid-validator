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
        <Button
          size="lg"
          variant="outline"
          color="white"
          backgroundColor="red.400"
          _hover={{ bg: 'red.300' }}
          _active={{ bg: 'red.400' }}
          onClick={props.onClose}
        >
          {t('close')}
        </Button>
      </ModalFooter>
    </ModalContent>
  )
}

export default ResultInvalid
