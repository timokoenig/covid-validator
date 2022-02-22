/* eslint-disable import/order */
import { Box, Heading, Stack, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { BComponent, BComponentProps } from '.'
import { BTypeImmunizationStatus } from '../../../../utils/builder/types'
import vaccines from '../../../../utils/vaccines'
import BuilderModal from '../builder'
import BaseComponent from './base'

const BComponentImmunizationStatus = (props: BComponentProps<BTypeImmunizationStatus>) => {
  const { t } = useTranslation('common')
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <BaseComponent styles={props.styles} depth={props.depth} onClick={onOpen}>
        <Heading size="md" mb="2">
          {t(props.data.status)}
        </Heading>
        <Text mb="2">
          {props.data.vaccines.map(v => vaccines.find(vac => vac.id == v)?.name ?? v).join(', ')}
        </Text>
        <Stack>
          <Box
            backgroundColor={useColorModeValue('gray.200', 'gray.800')}
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
        </Stack>
      </BaseComponent>
      <BuilderModal
        data={props.data}
        isOpen={isOpen}
        onClose={onClose}
        onClick={type => props.onChange(type as BTypeImmunizationStatus)}
      />
    </>
  )
}

export default BComponentImmunizationStatus
