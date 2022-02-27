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

type Props = {
  isOpen: boolean
  onClose: () => void
}

const ResultWrongQrCode = (props: Props) => {
  const { t } = useTranslation('common')
  return (
    <ModalContent overflow="hidden" bg="gray.400">
      <ModalBody mb="5">
        <Center px="10" pt="10" mb="5" textAlign="center">
          <Heading color="white">{t('modal.result.wrongqrcode')}</Heading>
        </Center>
        <Text color="white" fontWeight="semibold" textAlign="center" px="10">
          {t('modal.result.wrongqrcode.message')}
        </Text>
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

export default ResultWrongQrCode
