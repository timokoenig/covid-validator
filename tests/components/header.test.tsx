import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import renderer from 'react-test-renderer'
import Header from '../../components/header'

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ChakraProvider>
        <Header showMenu={true} version="1" />
      </ChakraProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly without version', () => {
  const tree = renderer
    .create(
      <ChakraProvider>
        <Header showMenu={true} />
      </ChakraProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly without menu', () => {
  const tree = renderer
    .create(
      <ChakraProvider>
        <Header showMenu={false} />
      </ChakraProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
