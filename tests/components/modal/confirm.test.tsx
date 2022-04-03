import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import renderer from 'react-test-renderer'
import ConfirmModal from '../../../components/modal/confirm'

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ChakraProvider>
        <ConfirmModal title="foo" message="bar" isOpen={false} onClose={() => {}} />
      </ChakraProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
