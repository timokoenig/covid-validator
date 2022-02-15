import { Box, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  items: { code: string; name: string; updated: Date }[]
  selectedItem: string
  onChange: (item: string) => void
}

const StateList = (props: Props) => {
  const { t } = useTranslation('common')
  return (
    <RadioGroup onChange={props.onChange} value={props.selectedItem}>
      <Stack>
        {props.items.map(state => (
          <Radio value={state.code} key={state.code}>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Text fontWeight={state.code == '' ? 'bold' : ''}>{state.name}</Text>
              <Text fontSize="xs" ml="2">
                {state.code == ''
                  ? `(${t('modal.rules.updated')} ${moment(state.updated).format('DD.MM.YYYY')})`
                  : ``}
              </Text>
            </Box>
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  )
}

export default StateList
