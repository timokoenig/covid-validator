import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import renderer from 'react-test-renderer'
import Information from '../../../components/information'

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ChakraProvider>
        <Information />
      </ChakraProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
