import React from 'react'
import { Modal, ModalOverlay } from '@chakra-ui/react'
import { ScanResult } from '../../../utils/dcc'
import ResultValid from './result-valid'
import ResultInvalid from './result-invalid'
import ResultTechnicallyInvalid from './result-technically-invalid'
import ResultMultiscan from './result-multiscan'

type Props = {
  isOpen: boolean
  onClose: (multiscan: boolean) => void
  result: ScanResult
}

const Body = (props: Props) => {
  const verificationFailed = props.result.certificates.find(cert => !cert.verification)
  if (verificationFailed !== undefined) {
    return <ResultTechnicallyInvalid {...props} />
  }

  const ruleValidationFailed = props.result.certificates.find(
    cert => cert.ruleValidation?.isValid === false
  )
  if (ruleValidationFailed !== undefined) {
    return <ResultInvalid {...props} />
  }

  if (props.result.isMultiScan && props.result.certificates.length == 1) {
    return <ResultMultiscan {...props} />
  }

  return <ResultValid {...props} />
}

const ResultModal = (props: Props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={() => {}} size="lg">
      <ModalOverlay />
      <Body {...props} />
    </Modal>
  )
}

export default ResultModal
