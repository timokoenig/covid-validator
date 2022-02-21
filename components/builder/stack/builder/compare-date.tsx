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
  BTypeCompareDate,
  OPERATOR_DATE_NOT_AFTER,
  OPERATOR_DATE_NOT_BEFORE,
} from '../../../../utils/builder/types'

const CompareDateBody = (props: {
  data?: BTypeCompareDate
  onClose: () => void
  onClick: (selection: string) => void
  onDelete: () => void
}) => {
  const { t } = useTranslation('common')
  const [value, setValue] = useState<string>(
    props.data ? props.data.operator : OPERATOR_DATE_NOT_AFTER
  )

  return (
    <ModalContent>
      <ModalHeader>{t('builder.comparedate')}</ModalHeader>
      <ModalCloseButton onClick={props.onClose} />
      <ModalBody>
        <Select value={value} onChange={e => setValue(e.target.value)}>
          <option value={OPERATOR_DATE_NOT_AFTER}>{OPERATOR_DATE_NOT_AFTER}</option>
          <option value={OPERATOR_DATE_NOT_BEFORE}>{OPERATOR_DATE_NOT_BEFORE}</option>
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

export default CompareDateBody
