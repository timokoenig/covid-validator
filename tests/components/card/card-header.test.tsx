import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import renderer from 'react-test-renderer'
import { resetAll } from 'simpler-state'
import CardHeader from '../../../components/card/card-header'
import { app } from '../../../state/app'

describe('CardHeader', () => {
  beforeEach(() => {
    resetAll()
  })

  it('renders correctly', () => {
    app.set({ ...app.get(), country: 'DE', state: '' })

    const tree = renderer
      .create(
        <ChakraProvider>
          <CardHeader />
        </ChakraProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
