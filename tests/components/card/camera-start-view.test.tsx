import React from 'react'
import renderer from 'react-test-renderer'
import CameraStartView from '../../../components/card/camera-start-view'

it('renders correctly', () => {
  const tree = renderer.create(<CameraStartView onClickStart={() => {}} />).toJSON()
  expect(tree).toMatchSnapshot()
})
