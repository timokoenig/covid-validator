/* eslint-disable @typescript-eslint/no-use-before-define */
import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { BClassIf, BClassValue, BClassVar } from '~/utils/builder/classes'
import { BType, BTypeIf, BTypeValue, BTypeVar } from '~/utils/builder/types'

// const Empty = () => (
//   <Button
//     py="3"
//     borderStyle="dashed"
//     borderWidth="2px"
//     borderColor="gray.600"
//     backgroundColor="transparent"
//     borderRadius="10"
//     isFullWidth
//   >
//     ADD
//   </Button>
// )

const BComponentVar = (props: BComponentProps<BTypeVar>) => (
  <Box
    py="3"
    pl="3"
    backgroundColor="gray.700"
    borderTopLeftRadius="10"
    borderBottomLeftRadius="10"
  >
    <Text>
      <Text as="span" fontWeight="semibold">
        VAR:
      </Text>{' '}
      {props.data.value}
    </Text>
  </Box>
)

const BComponentValue = (props: BComponentProps<BTypeValue>) => (
  <Box
    py="3"
    pl="3"
    backgroundColor="gray.700"
    borderTopLeftRadius="10"
    borderBottomLeftRadius="10"
  >
    <Text>
      <Text as="span" fontWeight="semibold">
        VALUE:
      </Text>{' '}
      {props.data.value === true ? 'true' : 'false'}
      <Button
        onClick={() => {
          const tmp = props.data
          tmp.value = !tmp.value
          props.onChange(tmp)
        }}
      >
        Boom
      </Button>
    </Text>
  </Box>
)

const BComponentIf = (props: BComponentProps<BTypeIf>) => (
  <Box
    backgroundColor="gray.700"
    pt="5"
    pl="5"
    borderTopLeftRadius="10"
    borderBottomLeftRadius="10"
  >
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
  </Box>
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
  return <Box />
}
