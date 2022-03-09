import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import renderer from 'react-test-renderer'
import { ScanResult } from '../../../../components/card/camera-scan-view'
import ResultMultiscan from '../../../../components/modal/result/result-multiscan'
import { vaccinationDCC } from '../../../utils/helpers'

it('renders correctly', () => {
  const result: ScanResult = {
    certificates: [vaccinationDCC()],
    error: null,
    multiscan: [],
  }
  const tree = renderer
    .create(
      <ChakraProvider>
        <ResultMultiscan result={result} isOpen={false} onClose={() => {}} />
      </ChakraProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
