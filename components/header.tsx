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
  Link,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import useColorMode from '@/utils/color-mode'

type Props = {
  showMenu?: boolean
}

const Header = (props: Props) => {
  const { toggleColorMode, newColorMode } = useColorMode()
  return (
    <Box display="flex">
      <Heading as="h1" size="2xl" marginBottom={5} flex="1">
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
          />
          <MenuList>
            <MenuItem onClick={toggleColorMode}>
              Toggle {newColorMode === 'light' ? 'Dark' : 'Light'}
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </Box>
  )
}

export default Header
