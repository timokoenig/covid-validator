import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import renderer from 'react-test-renderer'
import RulesModal from '../../../components/modal/rules'

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ChakraProvider>
        <RulesModal isOpen={true} onClose={() => {}} />
      </ChakraProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
