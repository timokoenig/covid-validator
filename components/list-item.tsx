import { ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Button, ListItem as ListItemComponent, Spacer, Text } from '@chakra-ui/react'
import React from 'react'

type Props = {
  title: string
  subtitle?: string
  onClick: () => void
}

const ListItem = (props: Props) => (
  <ListItemComponent display="flex">
    <Button variant="ghost" flex="1" py="7" onClick={props.onClick}>
      <Box textAlign="left">
        <Text fontWeight="semibold">{props.title}</Text>
        {props.subtitle && <Text fontWeight="normal">{props.subtitle}</Text>}
      </Box>
      <Spacer />
      <ChevronRightIcon width="5" height="5" />
    </Button>
  </ListItemComponent>
)

export default ListItem
