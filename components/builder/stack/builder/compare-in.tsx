import { DeleteIcon } from '@chakra-ui/icons'
import {
  Box,
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
import { BTypeCompareIn } from '../../../../utils/builder/types'

const CompareInBody = (props: {
  data?: BTypeCompareIn
  onClose: () => void
  onClick: (values: string[]) => void
  onDelete: () => void
}) => {
  const { t } = useTranslation('common')
  const [values, setValues] = useState<string[]>(props.data ? props.data.values : [''])

  return (
    <ModalContent>
      <ModalHeader>{t('builder.comparein')}</ModalHeader>
      <ModalCloseButton onClick={props.onClose} />
      <ModalBody>
        {values.map((v, index) => (
          <Box key={index} display="flex" flexDirection="row" mb="2">
            <Input
              value={v}
              onChange={e => {
                const tmp = [...values]
                tmp[index] = e.target.value
                setValues(tmp)
              }}
              mr="2"
            />
            <Button
              colorScheme="red"
              onClick={() => {
                const tmp = [...values]
                tmp.splice(index, 1)
                setValues(tmp)
              }}
            >
              <DeleteIcon width="5" height="5" />
            </Button>
          </Box>
        ))}
        <Button
          isFullWidth
          onClick={() => {
            if (values.length > 0 && values[values.length - 1] === '') return
            setValues([...values, ''])
          }}
        >
          {t('builder.additem')}
        </Button>
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
            props.onClick(values.filter(v => v !== ''))
            props.onClose()
          }}
        >
          {t('done')}
        </Button>
      </ModalFooter>
    </ModalContent>
  )
}

export default CompareInBody
