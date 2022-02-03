import React from 'react'
import { Text, Stack, Radio, RadioGroup, Box } from '@chakra-ui/react'

type Props = {
  items: string[]
  selectedItem: string
  onChange: (item: string) => void
}

const PurposeList = (props: Props) => {
  return (
    <RadioGroup onChange={props.onChange} value={props.selectedItem}>
      <Stack>
        {props.items.map(purpose => (
          <Radio value={purpose}>
            <Box py="5">
              <Text fontWeight="bold">{purpose}</Text>
            </Box>
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  )
}

export default PurposeList
