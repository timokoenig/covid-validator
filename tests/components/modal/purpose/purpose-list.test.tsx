import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import renderer from 'react-test-renderer'
import PurposeList from '../../../../components/modal/purpose/purpose-list'
import { Purpose } from '../../../../utils/models'

it('renders correctly', () => {
  const purpose: Purpose = { title: 'foo', info: 'bar' }
  const tree = renderer
    .create(
      <ChakraProvider>
        <PurposeList items={[purpose]} selectedItem={purpose} onChange={() => {}} />
      </ChakraProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
