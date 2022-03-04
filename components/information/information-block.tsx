import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'

type Props = {
  title: string | JSX.Element
  message: string | JSX.Element
}

const InformationBlock = (props: Props) => (
  <AccordionItem mb="5" border="0">
    <AccordionButton
      px="5"
      py="3"
      backgroundColor={useColorModeValue('gray.100', 'gray.700')}
      _hover={{ backgroundColor: useColorModeValue('gray.200', 'gray.600') }}
      rounded="10"
    >
      <Heading as="h4" size="sm" fontWeight="semibold" textAlign="left" flex="1">
        {props.title}
      </Heading>
      <AccordionIcon />
    </AccordionButton>
    <AccordionPanel>
      <Text>{props.message}</Text>
    </AccordionPanel>
  </AccordionItem>
)

export default InformationBlock
