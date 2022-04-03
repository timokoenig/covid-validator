import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import renderer from 'react-test-renderer'
import ResultInvalid from '../../../../components/modal/result/result-invalid'

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ChakraProvider>
        <ResultInvalid isOpen={false} onClose={() => {}} />
      </ChakraProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
