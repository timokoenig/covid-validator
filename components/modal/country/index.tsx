import { Modal, ModalOverlay } from '@chakra-ui/react'
import React, { useState } from 'react'
import CountryConfirmation from './country-confirmation'
import CountrySelection from './country-selection'

type Props = {
  isOpen: boolean
  onClose: () => void
  onChange: (selection: { country: string; state: string }) => void
}

const CountryModal = (props: Props) => {
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
        <CountryConfirmation selection={selection} setConfirm={setConfirm} onSave={onSave} />
      ) : (
        <CountrySelection
          selection={selection}
          setSelection={setSelection}
          setConfirm={setConfirm}
        />
      )}
    </Modal>
  )
}

export default CountryModal
