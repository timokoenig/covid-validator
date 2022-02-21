/* eslint-disable no-negated-condition */
import {
  Button,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spacer,
} from '@chakra-ui/react'
import { isNumber } from 'lodash'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BTypeValue, Value } from '../../../../utils/builder/types'

const ValueBody = (props: {
  data?: BTypeValue
  onClose: () => void
  onClick: (value: Value) => void
  onDelete: () => void
}) => {
  const { t } = useTranslation('common')
  const [value, setValue] = useState<string>(props.data ? props.data.value.toString() : '')

  const onDone = () => {
    if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
      // boolean
      props.onClick(value.toLowerCase() === 'true')
    } else if (isNumber(value)) {
      // number
      props.onClick(parseInt(value, 10))
    } else {
      // string
      props.onClick(value)
    }
  }

  return (
    <ModalContent>
      <ModalHeader>{t('builder.value')}</ModalHeader>
      <ModalCloseButton onClick={props.onClose} />
      <ModalBody>
        <Input value={value} onChange={e => setValue(e.target.value)} />
      </ModalBody>
      <ModalFooter>
        {props.data && (
          <Button variant="ghost" colorScheme="red" onClick={props.onDelete}>
            {t('delete')}
          </Button>
        )}
        <Spacer />
        <Button onClick={onDone}>{t('done')}</Button>
      </ModalFooter>
    </ModalContent>
  )
}

export default ValueBody
