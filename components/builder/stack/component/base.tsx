import { Box, useColorModeValue } from '@chakra-ui/react'
import React, { CSSProperties } from 'react'

const BaseComponent = (props: {
  children: JSX.Element | JSX.Element[]
  styles?: CSSProperties
  depth: number
  onClick?: () => void
}) => {
  return (
    <Box
      py="3"
      pl="3"
      display="block"
      width="100%"
      textAlign="left"
      backgroundColor={useColorModeValue(
        `rgba(237, 242, 247, ${1 - props.depth * 0.1})`,
        `rgba(74, 85, 104, ${1 - props.depth * 0.1})`
      )}
      borderTopLeftRadius="10"
      borderBottomLeftRadius="10"
      cursor="pointer"
      _hover={{
        background: useColorModeValue('gray.300', 'gray.600'),
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
}

export default BaseComponent
