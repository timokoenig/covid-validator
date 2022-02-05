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

type Props = {
  isOpen: boolean
  onClose: () => void
}

const SettingsModal = (props: Props) => {
  const [lang, setLang] = useState<string>(localStorage.getItem('lang') ?? 'en')
  const { toggleColorMode, newColorMode } = useColorMode()
  const { i18n } = useTranslation()

  useEffect(() => {
    localStorage.setItem('lang', lang)
    i18n.changeLanguage(lang)
  }, [lang])

  return (
    <Modal isOpen={props.isOpen} onClose={() => {}} size="lg" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Settings</ModalHeader>
        <ModalCloseButton onClick={props.onClose} />
        <ModalBody>
          <FormControl display="flex" alignItems="center" mb="5">
            <FormLabel flex="1">Dark Mode</FormLabel>
            <Switch size="lg" onChange={toggleColorMode} isChecked={newColorMode == 'light'} />
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <FormLabel flex="1">Preferred Language</FormLabel>
            <Select value={lang} onChange={e => setLang(e.target.value)} width="100">
              <option value="en">English</option>
              <option value="de">Deutsch</option>
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Text textAlign="center" flex="1">
            Version 0.1.0
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default SettingsModal
