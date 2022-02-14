/* eslint-disable react/no-unstable-nested-components */
import { Box, Modal, ModalOverlay } from '@chakra-ui/react'
import React, { useState } from 'react'
import TestSelection from './test-selection'
import TypeSelection from './type-selection'
import VaccineSelection from './vaccine-selection'
// import { useTranslation } from 'react-i18next'

type Props = {
  isOpen: boolean
  onClose: () => void
  onAdd: () => void
}

const WizardModal = (props: Props) => {
  const [type, setType] = useState<string>('')
  const [vaccines, setVaccines] = useState<string[]>([])
  const [tests, setTests] = useState<string[]>([])
  // const { t } = useTranslation('common')

  const onClose = () => {
    setType('')
    setVaccines([])
    setTests([])
    props.onClose()
  }

  const Body = (): JSX.Element => {
    if (type === '') {
      return <TypeSelection onClose={onClose} onClick={props.onAdd} />
    }
    if (type === 'Vaccination' && vaccines.length === 0) {
      return <VaccineSelection onClose={onClose} onClick={setVaccines} />
    }
    if (type === 'Test' && tests.length === 0) {
      return <TestSelection onClose={onClose} onClick={setTests} />
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
