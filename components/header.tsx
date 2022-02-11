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
        <Box display="flex">
          <Heading as="h1" size="2xl" flex="1">
            <Link href="/" _hover={{ textDecoration: 'none' }}>
              CovidValidator
            </Link>{' '}
            <Text display="inline" fontSize="lg" color="red">
              BETA
            </Text>
          </Heading>
          {(props.showMenu ?? true) && (
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<SettingsIcon />}
                variant="outline"
                onClick={onOpen}
              />
            </Menu>
          )}
        </Box>
        <Text fontWeight="semibold">{t('subtitle')}</Text>
      </Box>
      <SettingsModal isOpen={isOpen} onClose={onClose} version={props.version ?? 'n/a'} />
    </>
  )
}

export default Header
