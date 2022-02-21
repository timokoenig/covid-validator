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
import { CustomRule, exportRule, exportRules, Rule } from '../../../utils/certlogic'

type Props = {
  customRule?: CustomRule
  certificateRule?: Rule
  isOpen: boolean
  onClose: () => void
}

const ExportModal = (props: Props) => {
  const { t } = useTranslation('common')

  const exportedJSON = ((): string | null => {
    if (props.customRule && !props.certificateRule) {
      return JSON.stringify(exportRules(props.customRule), null, 2)
    }
    if (props.certificateRule) {
      return JSON.stringify(
        exportRule(props.certificateRule, props.customRule?.immunizationRules ?? []),
        null,
        2
      )
    }
    return null
  })()

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="lg" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('export')}</ModalHeader>
        <ModalCloseButton onClick={props.onClose} />
        <ModalBody>
          {exportedJSON ? <pre>{exportedJSON}</pre> : <Text>{t('export.none')}</Text>}
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  )
}

export default ExportModal
