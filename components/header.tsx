import { SettingsIcon } from '@chakra-ui/icons'
import {
  Box,
  Heading,
  IconButton,
  Link,
  Menu,
  MenuButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { disableScanner, enableScanner } from '../state/app'

const SettingsModal = dynamic(() => import('./modal/settings'), {
  ssr: false,
})

type Props = {
  showMenu?: boolean
  version?: string
}

const Header = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { t } = useTranslation('common')
  return (
    <>
      <Box mb="5">
        <Box display="flex" flexWrap="wrap">
          <Heading as="h1" size="2xl" flex="1" mr="3">
            <Link href="/" _hover={{ textDecoration: 'none' }}>
              CovidValidator
            </Link>
          </Heading>
          {(props.showMenu ?? true) && (
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<SettingsIcon />}
                variant="outline"
                onClick={() => {
                  disableScanner()
                  onOpen()
                }}
              />
            </Menu>
          )}
        </Box>
        <Text fontWeight="semibold">{t('subtitle')}</Text>
      </Box>
      <SettingsModal
        isOpen={isOpen}
        onClose={() => {
          enableScanner()
          onClose()
        }}
        version={props.version ?? 'n/a'}
      />
    </>
  )
}

export default Header
