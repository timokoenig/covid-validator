import React from 'react'
import renderer from 'react-test-renderer'
import RulesModal from '../../../components/modal/rules'

it('renders correctly', () => {
  const tree = renderer.create(<RulesModal isOpen={false} onClose={() => {}} />).toJSON()
  expect(tree).toMatchSnapshot()
})
