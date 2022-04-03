import React from 'react'
import renderer from 'react-test-renderer'
import PageMeta from '../../components/page-meta'

it('renders correctly', () => {
  const tree = renderer.create(<PageMeta />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly without index', () => {
  const tree = renderer.create(<PageMeta allowIndex={false} />).toJSON()
  expect(tree).toMatchSnapshot()
})
