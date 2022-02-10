import { Modal, ModalOverlay } from '@chakra-ui/react'
import React, { useState } from 'react'
import { app, setCountry, setState } from '../../../state/app'
import CountryConfirmation from './country-confirmation'
import CountrySelection from './country-selection'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const CountryModal = (props: Props) => {
  const appState = app.use()
  const [selection, setSelection] = useState<{ country: string; state: string }>({
    country: appState.country,
    state: appState.state,
  })
  const [confirm, setConfirm] = useState<boolean>(false)

  const onClose = () => {
    setConfirm(false)
    props.onClose()
  }

  const onSave = () => {
    setCountry(selection.country)
    setState(selection.state)
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
