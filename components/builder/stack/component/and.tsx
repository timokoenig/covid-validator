/* eslint-disable import/order */
import { Box, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { BComponent, BComponentProps } from '.'
import { BClassEmpty } from '../../../../utils/builder/classes'
import { BTypeAnd } from '../../../../utils/builder/types'
import BuilderModal from '../builder'
import BaseComponent from './base'
import BComponentEmpty from './empty'

const BComponentAnd = (props: BComponentProps<BTypeAnd>) => {
  const { t } = useTranslation('common')
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <BaseComponent styles={props.styles} depth={props.depth} onClick={onOpen}>
        <Text mb="2">
          <Text as="span" fontWeight="semibold">
            {t('builder.and')}
          </Text>
        </Text>
        <VStack>
          {props.data.conditions.map((c, index) => (
            <Box
              key={index}
              backgroundColor="gray.800"
              py="1"
              pl="1"
              borderTopLeftRadius="10"
              borderBottomLeftRadius="10"
              width="100%"
            >
              <BComponent
                data={c}
                depth={props.depth}
                onChange={data => {
                  const tmp = props.data
                  if (data instanceof BClassEmpty) {
                    tmp.conditions.splice(index, 1)
                  } else {
                    tmp.conditions[index] = data
                  }
                  props.onChange(tmp)
                }}
              />
            </Box>
          ))}
          <BComponentEmpty
            data={new BClassEmpty()}
            depth={props.depth}
            onChange={type => {
              const tmp = props.data
              tmp.conditions.push(type)
              props.onChange(tmp)
            }}
          />
        </VStack>
      </BaseComponent>
      <BuilderModal
        data={props.data}
        isOpen={isOpen}
        onClose={onClose}
        onClick={type => props.onChange(type as BTypeAnd)}
      />
    </>
  )
}

export default BComponentAnd
