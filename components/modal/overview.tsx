import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { app } from '../../state/app'
import { acceptanceRules, getCountryAndState } from '../../utils/certlogic'
import rules from '../../utils/eu-dcc-rules.json'
import Flag from '../flag'
import CountryModal from './country'
import PurposeModal from './purpose'
import RulesModal from './rules'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const OverviewModal = (props: Props) => {
  const { t } = useTranslation('common')
  const { isOpen: isOpenCountry, onOpen: onOpenCountry, onClose: onCloseCountry } = useDisclosure()
  const { isOpen: isOpenPurpose, onOpen: onOpenPurpose, onClose: onClosePurpose } = useDisclosure()
  const { isOpen: isOpenRules, onOpen: onOpenRules, onClose: onCloseRules } = useDisclosure()
  const appState = app.use()

  const countryAndState = getCountryAndState(
    useTranslation('country').t,
    appState.country,
    appState.state
  )
  const ruleCount = acceptanceRules(countryAndState.country.code, countryAndState.state.code).length

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={() => {}} size="lg" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>CovidValidator</ModalHeader>
          <ModalCloseButton onClick={props.onClose} />
          <ModalBody>
            <Box mb="5" display="flex" flexDirection="row">
              <Box display="flex" alignItems="center" mr="5">
                <Flag country="de" size={25} />
              </Box>
              <Box flex="1">
                <Text fontWeight="semibold">{countryAndState.country.name}</Text>
                <Text>{countryAndState.state.name}</Text>
              </Box>
              <Button variant="outline" onClick={onOpenCountry}>
                {t('change')}
              </Button>
            </Box>
            <hr />

            {countryAndState.country.code === 'DE' && (
              <>
                <Box my="5" display="flex" flexDirection="row">
                  <Box flex="1" display="flex" alignItems="center">
                    <Text fontWeight="semibold">{appState.purpose}</Text>
                  </Box>
                  <Button variant="outline" onClick={onOpenPurpose}>
                    {t('change')}
                  </Button>
                </Box>
                <hr />
              </>
            )}

            <Box my="5" display="flex" flexDirection="row">
              <Box flex="1" display="flex" flexDirection="column">
                <Text fontWeight="semibold">{ruleCount} rules active</Text>
                <Text>
                  ({t('modal.rules.updated')} {moment(rules.updatedAt).format('DD.MM.YYYY')})
                </Text>
              </Box>
              <Button variant="outline" onClick={onOpenRules}>
                {t('show')}
              </Button>
            </Box>
          </ModalBody>

          <ModalFooter />
        </ModalContent>
      </Modal>
      <CountryModal isOpen={isOpenCountry} onClose={onCloseCountry} />
      <PurposeModal isOpen={isOpenPurpose} onClose={onClosePurpose} />
      <RulesModal isOpen={isOpenRules} onClose={onCloseRules} />
    </>
  )
}

export default OverviewModal
