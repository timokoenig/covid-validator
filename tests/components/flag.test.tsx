import React from 'react'
import renderer from 'react-test-renderer'
import Flag from '../../components/flag'

it('renders correctly', () => {
  const tree = renderer.create(<Flag country="de" size={25} />).toJSON()
  expect(tree).toMatchSnapshot()
})
