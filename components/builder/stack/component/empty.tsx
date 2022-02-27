/* eslint-disable import/order */
import { Button, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { BComponentProps } from '.'
import { BTypeEmpty } from '../../../../utils/builder/types'
import BuilderModal from '../builder'

const BComponentEmpty = (props: BComponentProps<BTypeEmpty>) => {
  const { t } = useTranslation('common')
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button
        py="3"
        borderStyle="dashed"
        borderWidth="2px"
        borderColor="gray.500"
        backgroundColor="transparent"
        borderRadius="10"
        isFullWidth
        onClick={e => {
          e.stopPropagation()
          onOpen()
        }}
      >
        {t('add').toUpperCase()}
      </Button>
      <BuilderModal isOpen={isOpen} onClose={onClose} onClick={props.onChange} />
    </>
  )
}

export default BComponentEmpty
