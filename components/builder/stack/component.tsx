/* eslint-disable @typescript-eslint/no-use-before-define */
import { Box, Button, Heading, HStack, Stack, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React, { CSSProperties } from 'react'
import {
  BClassAnd,
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
  BTypeAnd,
  BTypeCertificateType,
  BTypeCompare,
  BTypeCompareDate,
  BTypeCompareIn,
  BTypeDate,
  BTypeEmpty,
  BTypeIf,
  BTypeValue,
  BTypeVar,
  OPERATOR_DATE_NOT_AFTER,
  OPERATOR_DATE_NOT_BEFORE,
  OPERATOR_EQUALS,
  OPERATOR_GREATER,
  OPERATOR_GREATER_EQUALS,
} from '~/utils/builder/types'
import BuilderModal from './builder-modal'

const BaseComponent = (props: {
  children: JSX.Element | JSX.Element[]
  styles?: CSSProperties
  depth: number
  onClick?: () => void
}) => (
  <Box
    py="3"
    pl="3"
    display="block"
    width="100%"
    textAlign="left"
    backgroundColor={`rgba(74, 85, 104, ${1 - props.depth * 0.1})`}
    borderTopLeftRadius="10"
    borderBottomLeftRadius="10"
    cursor="pointer"
    _hover={{
      background: 'gray.600',
    }}
    onClick={e => {
      e.stopPropagation()
      if (props.onClick === undefined) return
      props.onClick()
    }}
    style={props.styles}
  >
    {props.children}
  </Box>
)

const BComponentEmpty = (props: BComponentProps<BTypeEmpty>) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button
        py="3"
        borderStyle="dashed"
        borderWidth="2px"
        borderColor="gray.500"
        backgroundColor="transparent"
        borderRadius="10"
        isFullWidth
        onClick={e => {
          e.stopPropagation()
          onOpen()
        }}
      >
        ADD
      </Button>
      <BuilderModal isOpen={isOpen} onClose={onClose} onClick={props.onChange} />
    </>
  )
}

const BComponentVar = (props: BComponentProps<BTypeVar>) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <BaseComponent styles={props.styles} depth={props.depth} onClick={onOpen}>
        <Text>
          <Text as="span" fontWeight="semibold">
            VAR:
          </Text>{' '}
          {props.data.value}
        </Text>
      </BaseComponent>
      <BuilderModal
        data={props.data}
        isOpen={isOpen}
        onClose={onClose}
        onClick={type => props.onChange(type as BTypeVar)}
      />
    </>
  )
}

const BComponentValue = (props: BComponentProps<BTypeValue>) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <BaseComponent styles={props.styles} depth={props.depth} onClick={onOpen}>
        <Text>
          <Text as="span" fontWeight="semibold">
            VALUE:
          </Text>{' '}
          {typeof props.data.value === 'boolean'
            ? props.data.value
              ? 'TRUE'
              : 'FALSE'
            : props.data.value}
        </Text>
      </BaseComponent>
      <BuilderModal
        data={props.data}
        isOpen={isOpen}
        onClose={onClose}
        onClick={type => props.onChange(type as BTypeValue)}
      />
    </>
  )
}

const BComponentDate = (props: BComponentProps<BTypeDate>) => (
  <BaseComponent styles={props.styles} depth={props.depth}>
    <Text>
      <Text as="span" fontWeight="semibold">
        DATE:
      </Text>{' '}
      {`${props.data.value.value} + ${props.data.number} ${props.data.duration}`}
    </Text>
  </BaseComponent>
)

const BComponentCompare = (props: BComponentProps<BTypeCompare>) => (
  <BaseComponent styles={{ padding: 0 }} depth={props.depth}>
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
          onChange={_ => {
            const tmp = props.data
            // tmp.condition = data
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
          onChange={_ => {
            const tmp = props.data
            // tmp.condition = data
            props.onChange(tmp)
          }}
        />
      </Box>
    </HStack>
  </BaseComponent>
)

const BComponentCompareDate = (props: BComponentProps<BTypeCompareDate>) => (
  <BaseComponent styles={{ padding: 0 }} depth={props.depth}>
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
          onChange={_ => {
            const tmp = props.data
            // tmp.condition = data
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
          onChange={_ => {
            const tmp = props.data
            // tmp.condition = data
            props.onChange(tmp)
          }}
        />
      </Box>
    </HStack>
  </BaseComponent>
)

const BComponentCompareIn = (props: BComponentProps<BTypeCompareIn>) => (
  <BaseComponent styles={{ padding: 0 }} depth={props.depth}>
    <HStack>
      <Box
        backgroundColor="gray.800"
        borderRadius="10"
        borderRight="3px solid"
        borderRightColor="gray.800"
      >
        <BComponent
          data={props.data.variable}
          depth={props.depth}
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
        backgroundColor="gray.800"
        borderRadius="10"
        borderLeft="3px solid"
        borderLeftColor="gray.800"
        flex="1"
        flexDirection="column"
      >
        <BaseComponent depth={props.depth + 1}>
          <Text>{props.data.values.join(', ')}</Text>
        </BaseComponent>
      </Box>
      {/* <Box
        as="button"
        display="flex"
        backgroundColor="gray.700"
        borderTopLeftRadius="10"
        borderBottomLeftRadius="10"
        borderLeft="3px solid"
        borderLeftColor="gray.800"
        flex="1"
        padding="3"
        _hover={{
          background: 'gray.600',
        }}
      >

      </Box> */}
    </HStack>
  </BaseComponent>
)

const BComponentIf = (props: BComponentProps<BTypeIf>) => (
  <BaseComponent styles={props.styles} depth={props.depth}>
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
          depth={props.depth}
          onChange={data => {
            const tmp = props.data
            tmp.condition = data
            props.onChange(tmp)
          }}
        />
      </Box>
      <Heading size="sm" p="1">
        THEN
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
        ELSE
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
)

const BComponentAnd = (props: BComponentProps<BTypeAnd>) => (
  <BaseComponent styles={props.styles} depth={props.depth}>
    <Text mb="2">
      <Text as="span" fontWeight="semibold">
        AND
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
            onChange={_ => {
              const tmp = props.data
              // tmp.condition = data
              props.onChange(tmp)
            }}
          />
        </Box>
      ))}
      <BComponentEmpty data={new BClassEmpty()} depth={props.depth} onChange={() => {}} />
    </VStack>
  </BaseComponent>
)

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
        </Stack>
      </BaseComponent>
      <BuilderModal
        data={props.data}
        isOpen={isOpen}
        onClose={onClose}
        onClick={type => {
          props.onChange(type as BTypeCertificateType)
          onClose()
        }}
      />
    </>
  )
}

type BComponentProps<T> = {
  data: T
  styles?: CSSProperties
  depth: number
  onChange: (data: T) => void
}

export const BComponent = (props: BComponentProps<BType>) => {
  if (props.data instanceof BClassIf) {
    return (
      <BComponentIf
        data={props.data}
        styles={props.styles}
        depth={props.depth + 1}
        onChange={props.onChange}
      />
    )
  }
  if (props.data instanceof BClassValue) {
    return (
      <BComponentValue
        data={props.data}
        styles={props.styles}
        depth={props.depth + 1}
        onChange={props.onChange}
      />
    )
  }
  if (props.data instanceof BClassVar) {
    return (
      <BComponentVar
        data={props.data}
        styles={props.styles}
        depth={props.depth + 1}
        onChange={props.onChange}
      />
    )
  }
  if (props.data instanceof BClassCertificateType) {
    return (
      <BComponentCertificateType
        data={props.data}
        styles={props.styles}
        depth={props.depth + 1}
        onChange={props.onChange}
      />
    )
  }
  if (props.data instanceof BClassDate) {
    return (
      <BComponentDate
        data={props.data}
        styles={props.styles}
        depth={props.depth + 1}
        onChange={props.onChange}
      />
    )
  }
  if (props.data instanceof BClassCompare) {
    return (
      <BComponentCompare
        data={props.data}
        styles={props.styles}
        depth={props.depth + 1}
        onChange={props.onChange}
      />
    )
  }
  if (props.data instanceof BClassCompareDate) {
    return (
      <BComponentCompareDate
        data={props.data}
        styles={props.styles}
        depth={props.depth + 1}
        onChange={props.onChange}
      />
    )
  }
  if (props.data instanceof BClassCompareIn) {
    return (
      <BComponentCompareIn
        data={props.data}
        styles={props.styles}
        depth={props.depth + 1}
        onChange={props.onChange}
      />
    )
  }
  if (props.data instanceof BClassAnd) {
    return (
      <BComponentAnd
        data={props.data}
        styles={props.styles}
        depth={props.depth + 1}
        onChange={props.onChange}
      />
    )
  }
  if (props.data instanceof BClassEmpty) {
    return <BComponentEmpty data={props.data} depth={props.depth + 1} onChange={props.onChange} />
  }
  return <Box />
}
