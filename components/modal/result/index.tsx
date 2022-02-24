import { Modal, ModalOverlay } from '@chakra-ui/react'
import React from 'react'
import { DCCParseError } from '../../../utils/dcc'
import {
  DCCExpiredError,
  DCCNoValidationError,
  DCCPurposeError,
  DCCValidationError,
  DCCVerifyError,
  DCCWrongMultiscanError,
} from '../../../utils/dcc-scanner'
import { ScanResult, WrongQRCodeError } from '../../card/camera-scan-view'
import ResultInvalid from './result-invalid'
import ResultMultiscan from './result-multiscan'
import ResultTechnicallyInvalid from './result-technically-invalid'
import ResultValid from './result-valid'
import ResultWrongQrCode from './result-wrong-qr-code'

type Props = {
  isOpen: boolean
  onClose: () => void
  result: ScanResult
}

const Body = (props: Props): JSX.Element => {
  // Multiscan Result
  if (props.result.multiscan.length > 0 || props.result.error instanceof DCCWrongMultiscanError) {
    return <ResultMultiscan {...props} />
  }

  // Valid Result
  if (props.result.error === null) {
    return <ResultValid {...props} />
  }

  // Invalid Result
  switch (props.result.error.constructor) {
    case WrongQRCodeError:
    case DCCParseError:
      return <ResultWrongQrCode {...props} />
    case DCCVerifyError:
    case DCCExpiredError:
      return <ResultTechnicallyInvalid {...props} />
    case DCCNoValidationError:
      return <ResultInvalid {...props} /> // TODO add specific error modal for no rules
    case DCCPurposeError:
    case DCCValidationError:
      return <ResultInvalid {...props} />
    default:
      return <ResultInvalid {...props} /> // TODO add specific error modal
  }
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
