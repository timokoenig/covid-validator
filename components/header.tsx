import React from 'react'
import {
  Heading,
  Box,
  Text,
  Menu,
  MenuButton,
  IconButton,
  Link,
  useDisclosure,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { useTranslation } from 'react-i18next'
import dynamic from 'next/dynamic'

const SettingsModal = dynamic(() => import('./settings-modal'), {
  ssr: false,
})

type Props = {
  showMenu?: boolean
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
              Covid Check
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
                icon={<HamburgerIcon />}
                variant="outline"
                onClick={onOpen}
              />
            </Menu>
          )}
        </Box>
        <Text fontWeight="semibold">{t('subtitle')}</Text>
      </Box>
      <SettingsModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default Header
