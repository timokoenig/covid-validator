import { Accordion, ChakraProvider, Text } from '@chakra-ui/react'
import React from 'react'
import renderer from 'react-test-renderer'
import InformationBlock from '../../../components/information/information-block'

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ChakraProvider>
        <Accordion>
          <InformationBlock title="foo" message="bar" />
        </Accordion>
      </ChakraProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly with components', () => {
  const tree = renderer
    .create(
      <ChakraProvider>
        <Accordion>
          <InformationBlock title={<Text>foo</Text>} message={<Text>bar</Text>} />
        </Accordion>
      </ChakraProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
