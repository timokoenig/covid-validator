import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import renderer from 'react-test-renderer'
import CountrySelection from '../../../../components/modal/country/country-selection'

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ChakraProvider>
        <CountrySelection
          selection={{ country: 'foo', state: 'bar' }}
          setSelection={() => {}}
          setConfirm={() => {}}
        />
      </ChakraProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
