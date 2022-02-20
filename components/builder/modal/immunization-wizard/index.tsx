import { Modal, ModalOverlay } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { BClassCompare, BClassVar } from '../../../../utils/builder/classes'
import { JSONObject, OPERATOR_EQUALS } from '../../../../utils/builder/types'
import { ImmunizationRule } from '../../../../utils/certlogic'
import TypeSelection from './type-selection'
import VaccineSelection from './vaccine-selection'

type Props = {
  isOpen: boolean
  onClose: () => void
  onAdd: (rule: ImmunizationRule) => void
}

const ImmunizationWizardModal = (props: Props) => {
  const [type, setType] = useState<string>('')

  useEffect(() => {
    setType('')
  }, [props])

  const onSelectVaccines = (vaccines: string[]) => {
    props.onAdd({
      id: uuidv4(),
      medicalProducts: vaccines,
      type,
      // default rule for every new immunization rule to make it easier for the user
      rule: new BClassCompare(
        new BClassVar('payload.v.0.dn'),
        new BClassVar('payload.v.0.sd'),
        OPERATOR_EQUALS
      ).decode() as JSONObject,
    })
    props.onClose()
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="lg" scrollBehavior="inside">
      <ModalOverlay />
      {type === '' ? (
        <TypeSelection onClose={props.onClose} onSelect={setType} />
      ) : (
        <VaccineSelection onClose={props.onClose} onSelect={onSelectVaccines} />
      )}
    </Modal>
  )
}

export default ImmunizationWizardModal
