import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { CertificateRule, CustomRule, exportRule, exportRules } from '../../../utils/certlogic'

type Props = {
  customRule?: CustomRule
  certificateRule?: CertificateRule
  isOpen: boolean
  onClose: () => void
}

const LanguageModal = (props: Props) => {
  const { t } = useTranslation('common')

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="lg" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('export')}</ModalHeader>
        <ModalCloseButton onClick={props.onClose} />
        <ModalBody>
          {props.customRule && !props.certificateRule && (
            <pre>{JSON.stringify(exportRules(props.customRule), null, 2)}</pre>
          )}
          {props.certificateRule && (
            <pre>
              {JSON.stringify(
                exportRule(props.certificateRule, props.customRule?.immunizationRules ?? []),
                null,
                2
              )}
            </pre>
          )}
          {props.customRule === undefined && props.certificateRule === undefined && (
            <Text>{t('export.none')}</Text>
          )}
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  )
}

export default LanguageModal