import { List } from '@chakra-ui/react'
import React from 'react'
import renderer from 'react-test-renderer'
import ListItem from '../../components/list-item'

it('renders correctly', () => {
  const tree = renderer
    .create(
      <List>
        <ListItem title="foo" subtitle="bar" onClick={() => {}} />
      </List>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly without subtitle', () => {
  const tree = renderer
    .create(
      <List>
        <ListItem title="foo" onClick={() => {}} />
      </List>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
