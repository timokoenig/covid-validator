import React from 'react'
import { Heading, Box, Text } from '@chakra-ui/react'

type Props = {
  title: string | JSX.Element
  message: string | JSX.Element
}

const InformationBlock = (props: Props) => (
  <Box mb="5">
    <Heading as="h4" size="md" mb="2">
      {props.title}
    </Heading>
    <Text>{props.message}</Text>
  </Box>
)

export default InformationBlock
