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
    app.set({ ...app.get(), country: 'foo', state: 'bar' })

    const tree = renderer.create(<CardHeader />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
