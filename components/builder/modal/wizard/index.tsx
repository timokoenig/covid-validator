/* eslint-disable react/no-unstable-nested-components */
import { Modal, ModalOverlay } from '@chakra-ui/react'
import React, { useState } from 'react'
import RuleSelection from './rule-selection'
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
  // const { t } = useTranslation('common')

  const onClose = () => {
    setType('')
    setVaccine('')
    props.onClose()
  }

  const Body = (): JSX.Element => {
    if (type !== '') {
      if (vaccine !== '') {
        return <RuleSelection type={type} vaccine={vaccine} onClose={onClose} />
      }
      return <VaccineSelection onClose={onClose} onClick={setVaccine} />
    }
    return <TypeSelection onClose={onClose} onClick={setType} />
  }

  return (
    <Modal isOpen={props.isOpen} onClose={onClose} size="lg" scrollBehavior="inside">
      <ModalOverlay />
      <Body />
    </Modal>
  )
}

export default WizardModal
