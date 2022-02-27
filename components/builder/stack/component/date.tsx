/* eslint-disable import/order */
import { Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { BComponentProps } from '.'
import { BTypeDate } from '../../../../utils/builder/types'
import BuilderModal from '../builder'
import BaseComponent from './base'

const BComponentDate = (props: BComponentProps<BTypeDate>) => {
  const { t } = useTranslation('common')
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <BaseComponent styles={props.styles} depth={props.depth} onClick={onOpen}>
        <Text>
          <Text as="span" fontWeight="semibold">
            {t('builder.date').toUpperCase()}:
          </Text>{' '}
          {`${props.data.value.value} + ${props.data.number} ${props.data.duration}`}
        </Text>
      </BaseComponent>
      <BuilderModal
        data={props.data}
        isOpen={isOpen}
        onClose={onClose}
        onClick={type => props.onChange(type as BTypeDate)}
      />
    </>
  )
}

export default BComponentDate
