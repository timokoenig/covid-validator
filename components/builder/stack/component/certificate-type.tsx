/* eslint-disable import/order */
import { Box, Heading, Stack, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { BComponent, BComponentProps } from '.'
import { BTypeCertificateType } from '../../../../utils/builder/types'
import BuilderModal from '../builder'
import BaseComponent from './base'

const BComponentCertificateType = (props: BComponentProps<BTypeCertificateType>) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <BaseComponent styles={props.styles} depth={props.depth} onClick={onOpen}>
        <Heading size="md" mb="2">
          {props.data.type}
        </Heading>
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
        onClick={type => props.onChange(type as BTypeCertificateType)}
      />
    </>
  )
}

export default BComponentCertificateType
