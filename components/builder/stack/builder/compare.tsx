import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  Spacer,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  BTypeCompare,
  OPERATOR_EQUALS,
  OPERATOR_GREATER,
  OPERATOR_GREATER_EQUALS,
} from '../../../../utils/builder/types'

const CompareBody = (props: {
  data?: BTypeCompare
  onClose: () => void
  onClick: (selection: string) => void
  onDelete: () => void
}) => {
  const { t } = useTranslation('common')
  const [value, setValue] = useState<string>(props.data ? props.data.operator : OPERATOR_EQUALS)

  return (
    <ModalContent>
      <ModalHeader>{t('builder.compare')}</ModalHeader>
      <ModalCloseButton onClick={props.onClose} />
      <ModalBody>
        <Select value={value} onChange={e => setValue(e.target.value)}>
          <option value={OPERATOR_EQUALS}>{OPERATOR_EQUALS}</option>
          <option value={OPERATOR_GREATER}>{OPERATOR_GREATER}</option>
          <option value={OPERATOR_GREATER_EQUALS}>{OPERATOR_GREATER_EQUALS}</option>
        </Select>
      </ModalBody>
      <ModalFooter>
        {props.data && (
          <Button variant="ghost" colorScheme="red" onClick={props.onDelete}>
            {t('delete')}
          </Button>
        )}
        <Spacer />
        <Button
          onClick={() => {
            props.onClick(value)
            props.onClose()
          }}
        >
          {t('done')}
        </Button>
      </ModalFooter>
    </ModalContent>
  )
}

export default CompareBody
