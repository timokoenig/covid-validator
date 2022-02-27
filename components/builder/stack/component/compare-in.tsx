/* eslint-disable import/order */
import { Box, HStack, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { BComponent, BComponentProps } from '.'
import { BTypeCompareIn } from '../../../../utils/builder/types'
import BuilderModal from '../builder'
import BaseComponent from './base'

const BComponentCompareIn = (props: BComponentProps<BTypeCompareIn>) => {
  const { t } = useTranslation('common')
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
              data={props.data.variable}
              depth={props.depth}
              styles={{ borderRadius: 10, paddingRight: 12 }}
              onChange={data => {
                const tmp = props.data
                tmp.variable = data
                props.onChange(tmp)
              }}
            />
          </Box>
          <Text fontWeight="semibold" px="10">
            {t('builder.in')}
          </Text>
          <Box flex="1" flexDirection="column">
            <Text>{props.data.values.join(', ')}</Text>
          </Box>
        </HStack>
      </BaseComponent>
      <BuilderModal
        data={props.data}
        isOpen={isOpen}
        onClose={onClose}
        onClick={type => props.onChange(type as BTypeCompareIn)}
      />
    </>
  )
}

export default BComponentCompareIn
