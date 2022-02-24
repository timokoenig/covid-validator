import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Heading,
  Text,
} from '@chakra-ui/react'
import React from 'react'

type Props = {
  title: string | JSX.Element
  message: string | JSX.Element
}

const InformationBlock = (props: Props) => (
  <AccordionItem mb="5" borderTop="0">
    <AccordionButton px="5" py="3" backgroundColor="gray.100" rounded="10">
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
