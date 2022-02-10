import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Switch,
  Text,
  Select,
} from '@chakra-ui/react'
import useColorMode from '@/utils/color-mode'
import { useTranslation } from 'react-i18next'
import { showCounter, toggle } from '../../state/show-counter'

const availableLanguages = ['en', 'de']

type Props = {
  isOpen: boolean
  onClose: () => void
  version: string
}

const SettingsModal = (props: Props) => {
  const [lang, setLang] = useState<string>(
    localStorage.getItem('i18nextLng')?.substring(0, 2) ?? 'en'
  )
  const { toggleColorMode, newColorMode } = useColorMode()
  const showCounterComponent = showCounter.use()
  const { t, i18n } = useTranslation('common')

  useEffect(() => {
    i18n.changeLanguage(lang).catch(console.log)
  }, [lang, i18n])

  return (
    <Modal isOpen={props.isOpen} onClose={() => {}} size="lg" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('modal.settings')}</ModalHeader>
        <ModalCloseButton onClick={props.onClose} />
        <ModalBody>
          <FormControl display="flex" alignItems="center" mb="5">
            <FormLabel flex="1">{t('modal.settings.darkmode')}</FormLabel>
            <Switch size="lg" onChange={toggleColorMode} isChecked={newColorMode == 'light'} />
          </FormControl>

          <FormControl display="flex" alignItems="center" mb="5">
            <FormLabel flex="1">{t('modal.settings.language')}</FormLabel>
            <Select value={lang} onChange={e => setLang(e.target.value)} width="100">
              {availableLanguages.map(key => (
                <option key={key} value={key}>
                  {t(`lang.${key}`)}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl display="flex" alignItems="center" mb="5">
            <FormLabel flex="1">{t('modal.settings.counter')}</FormLabel>
            <Switch size="lg" onChange={toggle} isChecked={showCounterComponent} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Text textAlign="center" flex="1">
            {t('version')} {props.version}
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default SettingsModal
