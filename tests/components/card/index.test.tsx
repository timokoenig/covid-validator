import React from 'react'
import renderer from 'react-test-renderer'
import Card from '../../../components/card'

it('renders correctly', () => {
  const tree = renderer.create(<Card />).toJSON()
  expect(tree).toMatchSnapshot()
})
