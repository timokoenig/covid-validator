import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import renderer from 'react-test-renderer'
import StateList from '../../../../components/modal/country/state-list'

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ChakraProvider>
        <StateList
          items={[{ code: 'foo', name: 'bar', updated: new Date() }]}
          selectedItem="foo"
          onChange={() => {}}
        />
      </ChakraProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
