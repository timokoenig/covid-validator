import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import renderer from 'react-test-renderer'
import ResultTechnicallyInvalid from '../../../../components/modal/result/result-technically-invalid'

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ChakraProvider>
        <ResultTechnicallyInvalid isOpen={false} onClose={() => {}} />
      </ChakraProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
