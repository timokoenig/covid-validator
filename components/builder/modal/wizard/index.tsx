import { Modal, ModalOverlay } from '@chakra-ui/react'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { BClassCertificateType } from '../../../../utils/builder/classes'
import { Rule } from '../../../../utils/certlogic'
import TypeSelection from './type-selection'

type Props = {
  isOpen: boolean
  onClose: () => void
  onAdd: (data: Rule) => void
}

const WizardModal = (props: Props) => (
  <Modal isOpen={props.isOpen} onClose={props.onClose} size="lg" scrollBehavior="inside">
    <ModalOverlay />
    <TypeSelection
      onClose={props.onClose}
      onClick={selection =>
        props.onAdd({
          // TODO make these values editable in the detail view
          Identifier: uuidv4(),
          Type: 'Acceptance',
          Country: 'DE',
          Version: '1.0.0',
          SchemaVersion: '1.0.0',
          Engine: 'CERTLOGIC',
          EngineVersion: '0.7.5',
          CertificateType: selection,
          Description: [],
          ValidFrom: '2022-01-01T00:00:00Z',
          ValidTo: '2023-01-01T00:00:00Z',
          AffectedFields: [],
          // default for every new certificate rule to make it easier for the user
          Logic: new BClassCertificateType(selection).decode(),
        })
      }
    />
  </Modal>
)

export default WizardModal
