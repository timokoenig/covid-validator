import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import renderer from 'react-test-renderer'
import CountryModal from '../../../../components/modal/country'

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ChakraProvider>
        <CountryModal isOpen={false} onClose={() => {}} />
      </ChakraProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
