import React from 'react'
import renderer from 'react-test-renderer'
import PurposeModal from '../../../../components/modal/purpose'

it('renders correctly', () => {
  const tree = renderer.create(<PurposeModal isOpen={false} onClose={() => {}} />).toJSON()
  expect(tree).toMatchSnapshot()
})
