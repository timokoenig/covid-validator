import React from 'react'
import renderer from 'react-test-renderer'
import Information from '../../../components/information'

it('renders correctly', () => {
  const tree = renderer.create(<Information />).toJSON()
  expect(tree).toMatchSnapshot()
})
