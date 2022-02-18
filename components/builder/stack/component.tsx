/* eslint-disable @typescript-eslint/no-use-before-define */
import { Box, Button, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import React, { CSSProperties } from 'react'
import {
  BClassCertificateType,
  BClassCompare,
  BClassCompareDate,
  BClassCompareIn,
  BClassDate,
  BClassEmpty,
  BClassIf,
  BClassValue,
  BClassVar,
} from '~/utils/builder/classes'
import {
  BType,
  BTypeCertificateType,
  BTypeCompare,
  BTypeCompareDate,
  BTypeCompareIn,
  BTypeDate,
  BTypeIf,
  BTypeValue,
  BTypeVar,
  OPERATOR_DATE_AFTER,
  OPERATOR_DATE_BEFORE,
  OPERATOR_EQUALS,
  OPERATOR_GREATER,
  OPERATOR_GREATER_EQUALS,
} from '~/utils/builder/types'

const BaseComponent = (props: {
  children: JSX.Element | JSX.Element[]
  styles?: CSSProperties
}) => (
  <Box
    as="button"
    py="3"
    pl="3"
    display="block"
    width="100%"
    textAlign="left"
    backgroundColor="gray.700"
    borderTopLeftRadius="10"
    borderBottomLeftRadius="10"
    _hover={{
      background: 'gray.600',
    }}
    onClick={e => {
      e.stopPropagation()
      alert('ok')
    }}
    style={props.styles}
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
  <BaseComponent styles={props.styles}>
    <Text>
      <Text as="span" fontWeight="semibold">
        VAR:
      </Text>{' '}
      {props.data.value}
    </Text>
  </BaseComponent>
)

const BComponentValue = (props: BComponentProps<BTypeValue>) => (
  <BaseComponent styles={props.styles}>
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
  <BaseComponent styles={props.styles}>
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

const BComponentCompare = (props: BComponentProps<BTypeCompare>) => (
  <BaseComponent styles={props.styles}>
    <Text mb="2">
      <Text as="span" fontWeight="semibold">
        {props.data.operator === OPERATOR_EQUALS
          ? 'EQUALS'
          : props.data.operator === OPERATOR_GREATER
          ? 'GREATER'
          : props.data.operator === OPERATOR_GREATER_EQUALS
          ? 'GREATER EQUALS'
          : ''}
      </Text>
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
    <Box
      py="1"
      pl="1"
      backgroundColor="gray.800"
      borderTopLeftRadius="10"
      borderBottomLeftRadius="10"
    >
      <BComponent
        data={props.data.variableA}
        onChange={_ => {
          const tmp = props.data
          // tmp.condition = data
          props.onChange(tmp)
        }}
      />
    </Box>
    <Box
      py="1"
      pl="1"
      backgroundColor="gray.800"
      borderTopLeftRadius="10"
      borderBottomLeftRadius="10"
    >
      <BComponent
        data={props.data.variableB}
        onChange={_ => {
          const tmp = props.data
          // tmp.condition = data
          props.onChange(tmp)
        }}
      />
    </Box>
  </BaseComponent>
)

const BComponentCompareDate = (props: BComponentProps<BTypeCompareDate>) => (
  <BaseComponent styles={props.styles}>
    <Text mb="2">
      <Text as="span" fontWeight="semibold">
        {props.data.operator === OPERATOR_DATE_BEFORE
          ? 'BEFORE'
          : props.data.operator === OPERATOR_DATE_AFTER
          ? 'AFTER'
          : ''}
      </Text>
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
    <Box
      py="1"
      pl="1"
      backgroundColor="gray.800"
      borderTopLeftRadius="10"
      borderBottomLeftRadius="10"
    >
      <BComponent
        data={props.data.variableA}
        onChange={_ => {
          const tmp = props.data
          // tmp.condition = data
          props.onChange(tmp)
        }}
      />
    </Box>
    <Box
      py="1"
      pl="1"
      backgroundColor="gray.800"
      borderTopLeftRadius="10"
      borderBottomLeftRadius="10"
    >
      <BComponent
        data={props.data.variableB}
        onChange={_ => {
          const tmp = props.data
          // tmp.condition = data
          props.onChange(tmp)
        }}
      />
    </Box>
  </BaseComponent>
)

const BComponentCompareIn = (props: BComponentProps<BTypeCompareIn>) => (
  <BaseComponent styles={{ padding: 0 }}>
    <HStack>
      <Box backgroundColor="gray.800" borderRadius="10">
        <BComponent
          data={props.data.variable}
          styles={{ borderRadius: 10, paddingRight: 12 }}
          onChange={_ => {
            const tmp = props.data
            // tmp.condition = data
            props.onChange(tmp)
          }}
        />
      </Box>
      <Text fontWeight="semibold" px="10">
        IN
      </Text>
      <Box
        as="button"
        display="flex"
        backgroundColor="gray.700"
        borderTopLeftRadius="10"
        borderBottomLeftRadius="10"
        flex="1"
        padding="3"
        _hover={{
          background: 'gray.600',
        }}
      >
        {props.data.values.join(', ')}
      </Box>
    </HStack>
  </BaseComponent>
)

const BComponentIf = (props: BComponentProps<BTypeIf>) => (
  <BaseComponent>
    <Heading size="md" mb="2">
      IF
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
    <Heading size="md" mb="2">
      {props.data.type}
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
  styles?: CSSProperties
  onChange: (data: T) => void
}

export const BComponent = (props: BComponentProps<BType>) => {
  if (props.data instanceof BClassIf) {
    return <BComponentIf data={props.data} styles={props.styles} onChange={props.onChange} />
  }
  if (props.data instanceof BClassValue) {
    return <BComponentValue data={props.data} styles={props.styles} onChange={props.onChange} />
  }
  if (props.data instanceof BClassVar) {
    return <BComponentVar data={props.data} styles={props.styles} onChange={props.onChange} />
  }
  if (props.data instanceof BClassCertificateType) {
    return (
      <BComponentCertificateType
        data={props.data}
        styles={props.styles}
        onChange={props.onChange}
      />
    )
  }
  if (props.data instanceof BClassDate) {
    return <BComponentDate data={props.data} styles={props.styles} onChange={props.onChange} />
  }
  if (props.data instanceof BClassCompare) {
    return <BComponentCompare data={props.data} styles={props.styles} onChange={props.onChange} />
  }
  if (props.data instanceof BClassCompareDate) {
    return (
      <BComponentCompareDate data={props.data} styles={props.styles} onChange={props.onChange} />
    )
  }
  if (props.data instanceof BClassCompareIn) {
    return <BComponentCompareIn data={props.data} styles={props.styles} onChange={props.onChange} />
  }
  if (props.data instanceof BClassEmpty) {
    return <BComponentEmpty />
  }
  return <Box />
}
