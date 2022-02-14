/* eslint-disable react/no-unstable-nested-components */
import { Box, Modal, ModalOverlay } from '@chakra-ui/react'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { CertificateRule } from '../../../../utils/certlogic'
import TestSelection from './test-selection'
import TypeSelection from './type-selection'
import VaccineSelection from './vaccine-selection'

type Props = {
  isOpen: boolean
  onClose: () => void
  onAdd: (data: CertificateRule) => void
}

const WizardModal = (props: Props) => {
  const [type, setType] = useState<string>('')

  const onClose = () => {
    setType('')
    props.onClose()
  }

  const Body = (): JSX.Element => {
    if (type === '') {
      return (
        <TypeSelection
          onClose={onClose}
          onClick={selection => {
            if (selection === 'Recovery') {
              props.onAdd({ id: uuidv4(), result: true, type: 'Recovery', translations: [] })
              return
            }
            setType(selection)
          }}
        />
      )
    }
    if (type === 'Vaccination') {
      return (
        <VaccineSelection
          onClose={onClose}
          onClick={vaccines => {
            props.onAdd({
              id: uuidv4(),
              result: true,
              type,
              medicalProducts: vaccines,
              translations: [],
            })
          }}
        />
      )
    }
    if (type === 'Test') {
      return (
        <TestSelection
          onClose={onClose}
          onClick={tests => {
            props.onAdd({
              id: uuidv4(),
              result: true,
              type,
              medicalProducts: tests,
              translations: [],
            })
          }}
        />
      )
    }
    return <Box />
  }

  return (
    <Modal isOpen={props.isOpen} onClose={onClose} size="lg" scrollBehavior="inside">
      <ModalOverlay />
      <Body />
    </Modal>
  )
}

export default WizardModal
