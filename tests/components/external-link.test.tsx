import { Text } from '@chakra-ui/react'
import React from 'react'
import renderer from 'react-test-renderer'
import ExternalLink from '../../components/external-link'

it('renders correctly', () => {
  const tree = renderer
    .create(<ExternalLink href="https://covidvalidator.app">Link</ExternalLink>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly with component', () => {
  const tree = renderer
    .create(
      <ExternalLink href="https://covidvalidator.app">
        <Text>Link</Text>
      </ExternalLink>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
