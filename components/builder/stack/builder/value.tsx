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
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BTypeValue } from '../../../../utils/builder/types'

const ValueBody = (props: {
  data?: BTypeValue
  onClose: () => void
  onClick: (value: string) => void
  onDelete: () => void
}) => {
  const { t } = useTranslation('common')
  const [value, setValue] = useState<string>(props.data ? (props.data.value as string) : '')

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
        <Button onClick={() => props.onClick(value)}>{t('done')}</Button>
      </ModalFooter>
    </ModalContent>
  )
}

export default ValueBody
