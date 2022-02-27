import { Box, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { builder } from '../../../state/builder'

type Props = {
  selectedItem: string
  onChange: (item: string) => void
}

const CustomRuleList = (props: Props) => {
  const items = builder.get().customRules
  return (
    <RadioGroup onChange={props.onChange} value={props.selectedItem} mb="10">
      <Stack>
        {items.map(state => (
          <Radio value={state.id} key={state.id}>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Text>{state.name}</Text>
            </Box>
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  )
}

export default CustomRuleList
