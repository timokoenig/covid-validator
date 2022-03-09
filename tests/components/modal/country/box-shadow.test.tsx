import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import renderer from 'react-test-renderer'
import BoxShadow from '../../../../components/modal/country/box-shadow'

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ChakraProvider>
        <BoxShadow />
      </ChakraProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
