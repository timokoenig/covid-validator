import React from 'react'
import renderer from 'react-test-renderer'
import OnboardingModal from '../../../components/modal/onboarding'

it('renders correctly', () => {
  const tree = renderer.create(<OnboardingModal isOpen={false} onClose={() => {}} />).toJSON()
  expect(tree).toMatchSnapshot()
})
