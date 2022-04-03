import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import renderer from 'react-test-renderer'
import PurposeModal from '../../../../components/modal/purpose'

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ChakraProvider>
        <PurposeModal isOpen={false} onClose={() => {}} />
      </ChakraProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
