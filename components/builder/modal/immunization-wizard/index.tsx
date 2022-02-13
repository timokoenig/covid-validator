import { Modal, ModalOverlay } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ImmunizationRule } from '../../../../utils/certlogic'
import RuleSelection from './rule-selection'
import VaccineSelection from './vaccine-selection'

type Props = {
  isOpen: boolean
  onClose: () => void
  onCreate: (rule: ImmunizationRule) => void
}

const ImmunizationWizardModal = (props: Props) => {
  const [vaccines, setVaccines] = useState<string[]>([])

  useEffect(() => {
    setVaccines([])
  }, [props])

  const onClose = () => {
    setVaccines([])
    props.onClose()
  }

  return (
    <Modal isOpen={props.isOpen} onClose={onClose} size="lg" scrollBehavior="inside">
      <ModalOverlay />
      {vaccines.length === 0 ? (
        <VaccineSelection onClose={onClose} onClick={setVaccines} />
      ) : (
        <RuleSelection
          vaccines={vaccines}
          onClose={onClose}
          onCreate={rule => {
            props.onCreate(rule)
            props.onClose()
          }}
        />
      )}
    </Modal>
  )
}

export default ImmunizationWizardModal
