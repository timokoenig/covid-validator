/* eslint-disable import/order */
import { Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { BComponentProps } from '.'
import { BTypeValue } from '../../../../utils/builder/types'
import BuilderModal from '../builder'
import BaseComponent from './base'

const BComponentValue = (props: BComponentProps<BTypeValue>) => {
  const { t } = useTranslation('common')
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <BaseComponent styles={props.styles} depth={props.depth} onClick={onOpen}>
        <Text>
          <Text as="span" fontWeight="semibold">
            {t('builder.value').toUpperCase()}:
          </Text>{' '}
          {typeof props.data.value === 'boolean'
            ? props.data.value
              ? 'true'
              : 'false'
            : props.data.value}
        </Text>
      </BaseComponent>
      <BuilderModal
        data={props.data}
        isOpen={isOpen}
        onClose={onClose}
        onClick={type => props.onChange(type as BTypeValue)}
      />
    </>
  )
}

export default BComponentValue
