import React from 'react'
import { Text, Stack, Radio, RadioGroup, Box } from '@chakra-ui/react'
import { Purpose } from '~/utils/models'

type Props = {
  items: Purpose[]
  selectedItem: Purpose
  onChange: (item: Purpose) => void
}

const PurposeList = (props: Props) => {
  return (
    <RadioGroup
      onChange={val =>
        props.onChange(props.items.find(item => item.title == val) ?? props.items[0])
      }
      value={props.selectedItem.title}
    >
      <Stack>
        {props.items.map(purpose => (
          <Radio value={purpose.title}>
            <Box py="3" display="flex" flexDirection="row" alignItems="center">
              <Text fontWeight="bold">{purpose.title}</Text>
              <Text fontSize="xs" ml="2">
                {purpose.info}
              </Text>
            </Box>
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  )
}

export default PurposeList
