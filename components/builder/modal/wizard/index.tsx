/* eslint-disable react/no-unstable-nested-components */
import { Modal, ModalOverlay } from '@chakra-ui/react'
import React, { useState } from 'react'
import RuleSelection from './rule-selection'
import TestSelection from './test-selection'
import TypeSelection from './type-selection'
import VaccineSelection from './vaccine-selection'
// import { useTranslation } from 'react-i18next'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const WizardModal = (props: Props) => {
  const [type, setType] = useState<string>('')
  const [vaccine, setVaccine] = useState<string>('')
  const [test, setTest] = useState<string>('')
  // const { t } = useTranslation('common')

  const onClose = () => {
    setType('')
    setVaccine('')
    setTest('')
    props.onClose()
  }

  const Body = (): JSX.Element => {
    if (type === '') {
      return <TypeSelection onClose={onClose} onClick={setType} />
    }
    if (type === 'Vaccination' && vaccine === '') {
      return <VaccineSelection onClose={onClose} onClick={setVaccine} />
    }
    if (type === 'Test' && test === '') {
      return <TestSelection onClose={onClose} onClick={setTest} />
    }
    return <RuleSelection type={type} vaccine={vaccine} onClose={onClose} />
  }

  return (
    <Modal isOpen={props.isOpen} onClose={onClose} size="lg" scrollBehavior="inside">
      <ModalOverlay />
      <Body />
    </Modal>
  )
}

export default WizardModal
