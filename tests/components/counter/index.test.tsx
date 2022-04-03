import React from 'react'
import renderer from 'react-test-renderer'
import { resetAll } from 'simpler-state'
import Counter from '../../../components/counter'
import { app } from '../../../state/app'

describe('Counter', () => {
  beforeEach(() => {
    resetAll()
  })

  it('renders correctly', () => {
    app.set({ ...app.get(), showCounter: true })

    const tree = renderer.create(<Counter />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly with set counter', () => {
    app.set({ ...app.get(), counter: 1, showCounter: true })

    const tree = renderer.create(<Counter />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly without counter', () => {
    app.set({ ...app.get(), showCounter: false })

    const tree = renderer.create(<Counter />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
