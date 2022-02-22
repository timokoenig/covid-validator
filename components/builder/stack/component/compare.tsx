/* eslint-disable import/order */
import { Box, HStack, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { BComponent, BComponentProps } from '.'
import {
  BTypeCompare,
  OPERATOR_EQUALS,
  OPERATOR_GREATER,
  OPERATOR_GREATER_EQUALS,
} from '../../../../utils/builder/types'
import BuilderModal from '../builder'
import BaseComponent from './base'

const BComponentCompare = (props: BComponentProps<BTypeCompare>) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <BaseComponent styles={{ padding: 0 }} depth={props.depth} onClick={onOpen}>
        <HStack>
          <Box
            backgroundColor={useColorModeValue('gray.200', 'gray.800')}
            borderRadius="10"
            borderRight="3px solid"
            borderRightColor={useColorModeValue('gray.200', 'gray.800')}
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

          <Text as="span" fontWeight="semibold" px="10">
            {props.data.operator === OPERATOR_EQUALS
              ? 'EQUALS'
              : props.data.operator === OPERATOR_GREATER
              ? 'GREATER'
              : props.data.operator === OPERATOR_GREATER_EQUALS
              ? 'GREATER EQUALS'
              : ''}
          </Text>

          <Box
            backgroundColor={useColorModeValue('gray.200', 'gray.800')}
            borderRadius="10"
            flex="1"
            borderLeft="3px solid"
            borderLeftColor={useColorModeValue('gray.200', 'gray.800')}
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

export default BComponentCompare
