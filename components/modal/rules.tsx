import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Flag from '../flag'
import CountryModal from './country'
import PurposeModal from './purpose'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const RulesModal = (props: Props) => {
  const { t } = useTranslation('common')
  const { isOpen: isOpenCountry, onOpen: onOpenCountry, onClose: onCloseCountry } = useDisclosure()
  const { isOpen: isOpenPurpose, onOpen: onOpenPurpose, onClose: onClosePurpose } = useDisclosure()

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={() => {}} size="lg" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Covid Validator</ModalHeader>
          <ModalCloseButton onClick={props.onClose} />
          <ModalBody>
            <Box mb="5" display="flex" flexDirection="row">
              <Box display="flex" alignItems="center" mr="5">
                <Flag country="de" size={25} />
              </Box>
              <Box flex="1">
                <Text fontWeight="semibold">Deutschland</Text>
                <Text>Nationwide</Text>
              </Box>
              <Button variant="outline" onClick={onOpenCountry}>
                {t('change')}
              </Button>
            </Box>
            <hr />

            <Box my="5" display="flex" flexDirection="row">
              <Box flex="1" display="flex" alignItems="center">
                <Text fontWeight="semibold">2G+</Text>
              </Box>
              <Button variant="outline" onClick={onOpenPurpose}>
                {t('change')}
              </Button>
            </Box>
            <hr />

            <Box my="5" display="flex" flexDirection="row">
              <Box flex="1" display="flex" alignItems="center">
                <Text fontWeight="semibold">11 rules active</Text>
              </Box>
              <Button variant="outline">{t('show')}</Button>
            </Box>
          </ModalBody>

          <ModalFooter />
        </ModalContent>
      </Modal>
      <CountryModal isOpen={isOpenCountry} onClose={onCloseCountry} onChange={() => {}} />
      <PurposeModal isOpen={isOpenPurpose} onClose={onClosePurpose} onChange={() => {}} />
    </>
  )
}

export default RulesModal
