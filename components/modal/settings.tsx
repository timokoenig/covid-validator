import useColorMode from '@/utils/color-mode'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Switch,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { app, resetCounter, toggleCounter } from '../../state/app'
import { Rules } from '../../utils/certlogic'
import countries from '../../utils/countries'
import rules from '../../utils/eu-dcc-rules.json'
import Flag from '../flag'
import CountryModal from './country'
import PurposeModal from './purpose'
import RulesModal from './rules'

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
  const { t, i18n } = useTranslation('common')
  const { t: tCountry } = useTranslation('country')
  const { isOpen: isOpenCountry, onOpen: onOpenCountry, onClose: onCloseCountry } = useDisclosure()
  const { isOpen: isOpenPurpose, onOpen: onOpenPurpose, onClose: onClosePurpose } = useDisclosure()
  const { isOpen: isOpenRules, onOpen: onOpenRules, onClose: onCloseRules } = useDisclosure()
  const router = useRouter()
  const appState = app.use()

  const allCountries = countries(tCountry)
  const country = allCountries.find(item => item.code == appState.country) ?? allCountries[0]
  const state = country.states.find(item => item.code == appState.state) ?? country.states[0]
  const ruleCount = (rules as Rules).rules
    .filter(rule => moment() >= moment(rule.ValidFrom) && moment() < moment(rule.ValidTo))
    .filter(item => item.Country == country.code).length

  useEffect(() => {
    i18n.changeLanguage(lang).catch(console.log)
  }, [lang, i18n])

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose} size="lg" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('modal.settings')}</ModalHeader>
          <ModalCloseButton onClick={props.onClose} />
          <ModalBody>
            <Box mb="5" display="flex" flexDirection="row">
              <Box display="flex" alignItems="center" mr="5">
                <Flag country={country.code.toLowerCase()} size={25} />
              </Box>
              <Box flex="1">
                <Text fontWeight="semibold">{country.name}</Text>
                <Text>{state.name}</Text>
              </Box>
              <Button variant="outline" onClick={onOpenCountry}>
                {t('change')}
              </Button>
            </Box>

            {country.code === 'DE' && (
              <Box my="5" display="flex" flexDirection="row">
                <Box flex="1">
                  <Text>{t('modal.settings.purpose')}</Text>
                  <Text fontWeight="semibold">{appState.purpose}</Text>
                </Box>
                <Button variant="outline" onClick={onOpenPurpose}>
                  {t('change')}
                </Button>
              </Box>
            )}

            <Box my="5" display="flex" flexDirection="row">
              <Box flex="1" display="flex" flexDirection="column">
                <Text fontWeight="semibold">
                  {ruleCount} {t('modal.settings.rules')}
                </Text>
                <Text>
                  ({t('modal.rules.updated')} {moment(rules.updatedAt).format('DD.MM.YYYY')})
                </Text>
              </Box>
              <Button variant="outline" onClick={onOpenRules}>
                {t('show')}
              </Button>
            </Box>

            <Box my="5" display="flex" flexDirection="row">
              <Box flex="1" display="flex" flexDirection="column">
                <Button variant="outline" onClick={() => router.push('/builder')}>
                  Open Rule Builder
                </Button>
              </Box>
            </Box>

            <hr />

            <FormControl display="flex" alignItems="center" my="5">
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
              <FormLabel flex="1">{t('modal.settings.darkmode')}</FormLabel>
              <Switch size="lg" onChange={toggleColorMode} isChecked={newColorMode == 'light'} />
            </FormControl>

            <FormControl display="flex" alignItems="center" mb="5">
              <FormLabel flex="1">{t('modal.settings.counter')}</FormLabel>
              <Switch
                size="lg"
                onChange={() => {
                  resetCounter()
                  toggleCounter()
                }}
                isChecked={appState.showCounter}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Text textAlign="center" flex="1">
              {t('version')} {props.version}
            </Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <CountryModal isOpen={isOpenCountry} onClose={onCloseCountry} />
      <PurposeModal isOpen={isOpenPurpose} onClose={onClosePurpose} />
      <RulesModal isOpen={isOpenRules} onClose={onCloseRules} />
    </>
  )
}

export default SettingsModal
