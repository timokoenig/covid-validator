import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import renderer from 'react-test-renderer'
import CountryConfirmation from '../../../../components/modal/country/country-confirmation'

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ChakraProvider>
        <CountryConfirmation
          selection={{ country: 'foo', state: 'bar' }}
          setConfirm={() => {}}
          onSave={() => {}}
        />
      </ChakraProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
