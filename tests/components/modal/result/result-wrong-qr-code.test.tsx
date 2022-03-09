import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import renderer from 'react-test-renderer'
import ResultWrongQRCode from '../../../../components/modal/result/result-wrong-qr-code'

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ChakraProvider>
        <ResultWrongQRCode isOpen={false} onClose={() => {}} />
      </ChakraProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
