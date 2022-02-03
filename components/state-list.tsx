import React from 'react'
import { Text, Box, Stack, Radio, RadioGroup } from '@chakra-ui/react'
import moment from 'moment'

type Props = {
  items: { code: string; name: string; updated: Date }[]
  selectedItem: string
  onChange: (item: string) => void
}

const StateList = (props: Props) => {
  return (
    <RadioGroup onChange={props.onChange} value={props.selectedItem}>
      <Stack>
        {props.items.map(state => (
          <Radio value={state.code} isDisabled={state.code != ''}>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Text fontWeight={state.code == '' ? 'bold' : ''}>{state.name}</Text>
              <Text fontSize="xs" ml="2">
                {state.code == ''
                  ? `(updated ${moment(state.updated).format('DD.MM.YYYY')})`
                  : '(Coming soon)'}
              </Text>
            </Box>
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  )
}

export default StateList
