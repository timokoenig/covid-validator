import React, { useState } from 'react'
import { Modal, ModalOverlay } from '@chakra-ui/react'
import RuleConfirmation from './rule-confirmation'
import RuleSelection from './rule-selection'

type Props = {
  isOpen: boolean
  onClose: () => void
  onChange: (selection: { country: string; state: string }) => void
}

const RuleModal = (props: Props) => {
  const [selection, setSelection] = useState<{ country: string; state: string }>({
    country: localStorage.getItem('country') ?? 'DE',
    state: localStorage.getItem('state') ?? '',
  })
  const [confirm, setConfirm] = useState<boolean>(false)

  const onClose = () => {
    setConfirm(false)
    props.onClose()
  }

  const onSave = () => {
    props.onChange(selection)
    localStorage.setItem('country', selection.country)
    localStorage.setItem('state', selection.state)
    setConfirm(false)
    props.onClose()
  }

  return (
    <Modal isOpen={props.isOpen} onClose={onClose} size="lg" scrollBehavior="inside">
      <ModalOverlay />
      {confirm ? (
        <RuleConfirmation selection={selection} setConfirm={setConfirm} onSave={onSave} />
      ) : (
        <RuleSelection selection={selection} setSelection={setSelection} setConfirm={setConfirm} />
      )}
    </Modal>
  )
}

export default RuleModal
