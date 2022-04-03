import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import renderer from 'react-test-renderer'
import CustomRuleList from '../../../../components/modal/country/custom-rule-list'

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ChakraProvider>
        <CustomRuleList selectedItem="foo" onChange={() => {}} />
      </ChakraProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
