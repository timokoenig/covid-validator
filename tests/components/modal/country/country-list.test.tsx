import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import renderer from 'react-test-renderer'
import CountryList from '../../../../components/modal/country/country-list'

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ChakraProvider>
        <CountryList selectedCountry="foo" selectedState="bar" onChange={() => {}} />
      </ChakraProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
