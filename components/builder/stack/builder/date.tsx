import {
  Button,
  Input,
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
import { BTypeDate, DURATION_DAYS, DURATION_HOURS } from '../../../../utils/builder/types'

const DateBody = (props: {
  data?: BTypeDate
  onClose: () => void
  onClick: (value: string, number: number, duration: string) => void
  onDelete: () => void
}) => {
  const { t } = useTranslation('common')
  const [value, setValue] = useState<string>(props.data ? (props.data.value.value as string) : '')
  const [valueNumber, setValueNumber] = useState<string>(
    props.data ? props.data.number.toString() : '0'
  )
  const [valueDuration, setValueDuration] = useState<string>(
    props.data ? props.data.duration : DURATION_HOURS
  )

  return (
    <ModalContent>
      <ModalHeader>{t('builder.date')}</ModalHeader>
      <ModalCloseButton onClick={props.onClose} />
      <ModalBody>
        <Input value={value} placeholder="value" onChange={e => setValue(e.target.value)} />
        +
        <Input value={valueNumber} onChange={e => setValueNumber(e.target.value)} />
        <Select value={valueDuration} onChange={e => setValueDuration(e.target.value)}>
          <option value={DURATION_HOURS}>{DURATION_HOURS}</option>
          <option value={DURATION_DAYS}>{DURATION_DAYS}</option>
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
            props.onClick(value, parseInt(valueNumber, 10), valueDuration)
            props.onClose()
          }}
        >
          {t('done')}
        </Button>
      </ModalFooter>
    </ModalContent>
  )
}

export default DateBody
