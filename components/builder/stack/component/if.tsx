/* eslint-disable import/order */
import { Box, Heading, Stack, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { BComponent, BComponentProps } from '.'
import { BTypeIf } from '../../../../utils/builder/types'
import BuilderModal from '../builder'
import BaseComponent from './base'

const BComponentIf = (props: BComponentProps<BTypeIf>) => {
  const { t } = useTranslation('common')
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <BaseComponent styles={props.styles} depth={props.depth} onClick={onOpen}>
        <Heading size="md" mb="2">
          {t('builder.if')}
        </Heading>
        <Stack>
          <Box
            backgroundColor="gray.800"
            py="1"
            pl="1"
            borderTopLeftRadius="10"
            borderBottomLeftRadius="10"
          >
            <BComponent
              data={props.data.condition}
              depth={props.depth}
              onChange={data => {
                const tmp = props.data
                tmp.condition = data
                props.onChange(tmp)
              }}
            />
          </Box>
          <Heading size="sm" p="1">
            {t('builder.then')}
          </Heading>
          <Box
            backgroundColor="gray.800"
            py="1"
            pl="1"
            borderTopLeftRadius="10"
            borderBottomLeftRadius="10"
          >
            <BComponent
              data={props.data.conditionTrue}
              depth={props.depth}
              onChange={data => {
                const tmp = props.data
                tmp.conditionTrue = data
                props.onChange(tmp)
              }}
            />
          </Box>
          <Heading size="sm" p="1">
            {t('builder.else')}
          </Heading>
          <Box
            backgroundColor="gray.800"
            py="1"
            pl="1"
            borderTopLeftRadius="10"
            borderBottomLeftRadius="10"
          >
            <BComponent
              data={props.data.conditionFalse}
              depth={props.depth}
              onChange={data => {
                const tmp = props.data
                tmp.conditionFalse = data
                props.onChange(tmp)
              }}
            />
          </Box>
        </Stack>
      </BaseComponent>
      <BuilderModal
        data={props.data}
        isOpen={isOpen}
        onClose={onClose}
        onClick={type => props.onChange(type as BTypeIf)}
      />
    </>
  )
}

export default BComponentIf
