/* eslint-disable import/order */
import { Box, HStack, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { BComponent, BComponentProps } from '.'
import {
  BTypeCompare,
  BTypeCompareDate,
  OPERATOR_DATE_NOT_AFTER,
  OPERATOR_DATE_NOT_BEFORE,
} from '../../../../utils/builder/types'
import BuilderModal from '../builder'
import BaseComponent from './base'

const BComponentCompareDate = (props: BComponentProps<BTypeCompareDate>) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <BaseComponent styles={{ padding: 0 }} depth={props.depth} onClick={onOpen}>
        <HStack>
          <Box
            backgroundColor="gray.800"
            borderRadius="10"
            borderRight="3px solid"
            borderRightColor="gray.800"
          >
            <BComponent
              data={props.data.variableA}
              styles={{ borderRadius: 10, paddingRight: 12 }}
              depth={props.depth}
              onChange={data => {
                const tmp = props.data
                tmp.variableA = data
                props.onChange(tmp)
              }}
            />
          </Box>

          <Text fontWeight="semibold" px="10">
            {props.data.operator === OPERATOR_DATE_NOT_BEFORE
              ? 'NOT BEFORE'
              : props.data.operator === OPERATOR_DATE_NOT_AFTER
              ? 'NOT AFTER'
              : ''}
          </Text>

          <Box
            backgroundColor="gray.800"
            borderRadius="10"
            flex="1"
            borderLeft="3px solid"
            borderLeftColor="gray.800"
          >
            <BComponent
              data={props.data.variableB}
              styles={{ padding: '12' }}
              depth={props.depth}
              onChange={data => {
                const tmp = props.data
                tmp.variableB = data
                props.onChange(tmp)
              }}
            />
          </Box>
        </HStack>
      </BaseComponent>
      <BuilderModal
        data={props.data}
        isOpen={isOpen}
        onClose={onClose}
        onClick={type => props.onChange(type as BTypeCompare)}
      />
    </>
  )
}

export default BComponentCompareDate
