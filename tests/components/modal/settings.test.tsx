import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import renderer from 'react-test-renderer'
import SettingsModal from '../../../components/modal/settings'
import i18next from '../../../utils/i18next'

it('renders correctly', () => {
  const tree = renderer
    .create(
      <ChakraProvider>
        <I18nextProvider i18n={i18next}>
          <SettingsModal version="1" isOpen={false} onClose={() => {}} />
        </I18nextProvider>
      </ChakraProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
