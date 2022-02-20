/* eslint-disable react/no-unstable-nested-components */
import { Modal, ModalOverlay } from '@chakra-ui/react'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { BClassCertificateType } from '../../../../utils/builder/classes'
import { JSONObject } from '../../../../utils/builder/types'
import { CertificateRule } from '../../../../utils/certlogic'
import TypeSelection from './type-selection'

type Props = {
  isOpen: boolean
  onClose: () => void
  onAdd: (data: CertificateRule) => void
}

const WizardModal = (props: Props) => (
  <Modal isOpen={props.isOpen} onClose={props.onClose} size="lg" scrollBehavior="inside">
    <ModalOverlay />
    <TypeSelection
      onClose={props.onClose}
      onClick={selection =>
        props.onAdd({
          id: uuidv4(),
          type: selection,
          translations: [],
          // default rule for every new certificate rule to make it easier for the user
          rule: new BClassCertificateType(selection).decode() as JSONObject,
        })
      }
    />
  </Modal>
)

export default WizardModal
