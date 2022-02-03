import React from 'react'
import {
  Heading,
  Box,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import useColorMode from '@/utils/color-mode'

const Header = () => {
  const { toggleColorMode, newColorMode } = useColorMode()
  return (
    <Box display="flex">
      <Heading as="h1" size="2xl" marginBottom={5} flex="1">
        Covid Check{' '}
        <Text display="inline" fontSize="lg" color="red">
          BETA
        </Text>
      </Heading>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
        />
        <MenuList>
          <MenuItem onClick={toggleColorMode}>
            Toggle {newColorMode === 'light' ? 'Dark' : 'Light'}
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  )
}

export default Header