/* eslint-disable @typescript-eslint/no-use-before-define */
import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import {
  BClassCertificateType,
  BClassDate,
  BClassEmpty,
  BClassIf,
  BClassValue,
  BClassVar,
} from '~/utils/builder/classes'
import {
  BType,
  BTypeCertificateType,
  BTypeDate,
  BTypeIf,
  BTypeValue,
  BTypeVar,
} from '~/utils/builder/types'

const BaseComponent = (props: { children: JSX.Element | JSX.Element[] }) => (
  <Box
    py="3"
    pl="3"
    backgroundColor="gray.700"
    borderTopLeftRadius="10"
    borderBottomLeftRadius="10"
    _hover={{
      background: 'gray.600',
    }}
  >
    {props.children}
  </Box>
)

const BComponentEmpty = () => (
  <Button
    py="3"
    borderStyle="dashed"
    borderWidth="2px"
    borderColor="gray.600"
    backgroundColor="transparent"
    borderRadius="10"
    isFullWidth
  >
    ADD
  </Button>
)

const BComponentVar = (props: BComponentProps<BTypeVar>) => (
  <BaseComponent>
    <Text>
      <Text as="span" fontWeight="semibold">
        VAR:
      </Text>{' '}
      {props.data.value}
    </Text>
  </BaseComponent>
)

const BComponentValue = (props: BComponentProps<BTypeValue>) => (
  <BaseComponent>
    <Text>
      <Text as="span" fontWeight="semibold">
        VALUE:
      </Text>{' '}
      {props.data.value === true ? 'true' : 'false'}
      <Button
        size="xs"
        ml="5"
        onClick={() => {
          const tmp = props.data
          tmp.value = !tmp.value
          props.onChange(tmp)
        }}
      >
        Edit
      </Button>
    </Text>
  </BaseComponent>
)

const BComponentDate = (props: BComponentProps<BTypeDate>) => (
  <BaseComponent>
    <Text>
      <Text as="span" fontWeight="semibold">
        DATE:
      </Text>{' '}
      {`${props.data.value.value} + ${props.data.number} ${props.data.duration}`}
      <Button
        size="xs"
        ml="5"
        onClick={() => {
          const tmp = props.data
          // tmp.value = !tmp.value
          props.onChange(tmp)
        }}
      >
        Edit
      </Button>
    </Text>
  </BaseComponent>
)

const BComponentIf = (props: BComponentProps<BTypeIf>) => (
  <BaseComponent>
    <Heading size="md">IF</Heading>
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
          onChange={data => {
            const tmp = props.data
            tmp.condition = data
            props.onChange(tmp)
          }}
        />
      </Box>
      <Box
        backgroundColor="gray.800"
        py="1"
        pl="1"
        borderTopLeftRadius="10"
        borderBottomLeftRadius="10"
      >
        <Heading size="sm">THEN</Heading>
        <BComponent
          data={props.data.conditionTrue}
          onChange={data => {
            const tmp = props.data
            tmp.conditionTrue = data
            props.onChange(tmp)
          }}
        />
      </Box>
      <Box
        backgroundColor="gray.800"
        py="1"
        pl="1"
        borderTopLeftRadius="10"
        borderBottomLeftRadius="10"
      >
        <Heading size="sm">ELSE</Heading>
        <BComponent
          data={props.data.conditionFalse}
          onChange={data => {
            const tmp = props.data
            tmp.conditionFalse = data
            props.onChange(tmp)
          }}
        />
      </Box>
    </Stack>
  </BaseComponent>
)

const BComponentCertificateType = (props: BComponentProps<BTypeCertificateType>) => (
  <BaseComponent>
    <Heading size="md">{props.data.type}</Heading>
    <Stack>
      <Box
        backgroundColor="gray.800"
        py="1"
        pl="1"
        borderTopLeftRadius="10"
        borderBottomLeftRadius="10"
      >
        <BComponent
          data={props.data.conditionTrue}
          onChange={data => {
            const tmp = props.data
            tmp.conditionTrue = data
            props.onChange(tmp)
          }}
        />
      </Box>
    </Stack>
  </BaseComponent>
)

type BComponentProps<T> = {
  data: T
  onChange: (data: T) => void
}

export const BComponent = (props: BComponentProps<BType>) => {
  if (props.data instanceof BClassIf) {
    return <BComponentIf data={props.data} onChange={props.onChange} />
  }
  if (props.data instanceof BClassValue) {
    return <BComponentValue data={props.data} onChange={props.onChange} />
  }
  if (props.data instanceof BClassVar) {
    return <BComponentVar data={props.data} onChange={props.onChange} />
  }
  if (props.data instanceof BClassCertificateType) {
    return <BComponentCertificateType data={props.data} onChange={props.onChange} />
  }
  if (props.data instanceof BClassDate) {
    return <BComponentDate data={props.data} onChange={props.onChange} />
  }
  if (props.data instanceof BClassEmpty) {
    return <BComponentEmpty />
  }
  return <Box />
}
