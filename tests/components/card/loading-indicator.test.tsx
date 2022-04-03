import React from 'react'
import renderer from 'react-test-renderer'
import LoadingIndicator from '../../../components/card/loading-indicator'

it('renders correctly', () => {
  const tree = renderer.create(<LoadingIndicator />).toJSON()
  expect(tree).toMatchSnapshot()
})
