import React from 'react'
import renderer from 'react-test-renderer'
import CameraActionBar from '../../../components/card/camera-action-bar'

it('renders correctly', () => {
  const tree = renderer
    .create(<CameraActionBar onClickCamera={() => {}} onClickClose={() => {}} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
