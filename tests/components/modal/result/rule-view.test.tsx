import React from 'react'
import renderer from 'react-test-renderer'
import { resetAll } from 'simpler-state'
import RuleView from '../../../../components/modal/result/rule-view'
import { app } from '../../../../state/app'

describe('RuleView', () => {
  beforeEach(() => {
    resetAll()
  })

  it('renders correctly', () => {
    app.set({ ...app.get(), country: 'DE', state: 'HH' })

    const tree = renderer.create(<RuleView />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
