import React from 'react'
import renderer from 'react-test-renderer'
import ConfirmModal from '../../../components/modal/confirm'

it('renders correctly', () => {
  const tree = renderer
    .create(<ConfirmModal title="foo" message="bar" isOpen={false} onClose={() => {}} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
