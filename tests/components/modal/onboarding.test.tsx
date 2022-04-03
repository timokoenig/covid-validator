import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import renderer from 'react-test-renderer'
import OnboardingModal from '../../../components/modal/onboarding'

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ChakraProvider>
        <OnboardingModal isOpen={false} onClose={() => {}} />
      </ChakraProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
