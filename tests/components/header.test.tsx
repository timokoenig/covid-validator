import React from 'react'
import renderer from 'react-test-renderer'
import Header from '../../components/header'

it('renders correctly', () => {
  const tree = renderer.create(<Header showMenu={true} version="1" />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly without version', () => {
  const tree = renderer.create(<Header showMenu={true} />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly without menu', () => {
  const tree = renderer.create(<Header showMenu={false} />).toJSON()
  expect(tree).toMatchSnapshot()
})
