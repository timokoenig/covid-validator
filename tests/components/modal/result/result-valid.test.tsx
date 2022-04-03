import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import renderer from 'react-test-renderer'
import { ScanResult } from '../../../../components/card/camera-scan-view'
import ResultValid from '../../../../components/modal/result/result-valid'
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
        <ResultValid
          result={result}
          isOpen={false}
          onClose={() => {}}
          enableCounter={false}
          enableTimer={false}
        />
      </ChakraProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
