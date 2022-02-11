import {
  Box,
  Button,
  Checkbox,
  Heading,
  Link,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import parse from 'html-react-parser'
import React, { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const OnboardingModal = (props: Props) => {
  const { t } = useTranslation('common')
  const [accepted, setAccepted] = useState<boolean>(false)
  const onSave = () => {
    localStorage.setItem('onboarding', 'true')
    props.onClose()
  }

  return (
    <Modal isOpen={props.isOpen} onClose={() => {}} size="lg" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>CovidValidator</ModalHeader>
        <ModalBody>
          <Text>{parse(t('onboarding.message'))}</Text>
          <Heading size="sm" mt="5">
            {t('onboarding.list')}
          </Heading>
          <UnorderedList>
            <ListItem>{t('onboarding.list.0')}</ListItem>
            <ListItem>{t('onboarding.list.1')}</ListItem>
            <ListItem>{t('onboarding.list.2')}</ListItem>
            <ListItem>
              <Trans i18nKey="onboarding.list.3" t={t}>
                x
                <Link
                  href="http://github.com/timokoenig/covid-validator"
                  target="_blank"
                  style={{ textDecoration: 'underline' }}
                  mx="1"
                >
                  Github
                </Link>
                y
              </Trans>
            </ListItem>
            <ListItem>
              <Trans i18nKey="onboarding.list.4" t={t}>
                x
                <Link
                  href="https://www.hetzner.com/"
                  target="_blank"
                  style={{ textDecoration: 'underline' }}
                  mx="1"
                >
                  Hetzner Online GmbH
                </Link>
                y
              </Trans>
            </ListItem>
          </UnorderedList>

          <Box my="5">
            <Link href="/privacy" target="_blank" style={{ textDecoration: 'underline' }}>
              {t('onboarding.privacy')}
            </Link>
          </Box>

          <Button
            isFullWidth
            h="auto"
            position="relative"
            overflowWrap="anywhere"
            whiteSpace="normal"
            onClick={() => setAccepted(!accepted)}
          >
            <Checkbox
              isChecked={accepted}
              mr="5"
              maxW="100%"
              p="4"
              onChange={e => setAccepted(!e.target.checked)}
              wordBreak="break-all"
            >
              {t('onboarding.privacy.accept')}
            </Checkbox>
          </Button>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onSave} isDisabled={!accepted}>
            {t('continue')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default OnboardingModal
