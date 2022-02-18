import { Box, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { JSONObject } from '../../../utils/builder/types'
import BuilderStack from '../stack'

const EmptyComponent = () => {
  const [data, setData] = useState<JSONObject>({
    if: [{ var: 'payload.0.1.2' }, { if: [{ var: 'payload.0.1.2' }, false, false] }, false],
  })
  const { t } = useTranslation('common')
  return (
    <Box flex="1" px="10" py="5" display="flex" flexDirection="column" overflow="scroll">
      <Box p="10">
        <Text textAlign="center">{t('builder.placeholder')}</Text>
        <BuilderStack data={data} onChange={setData} />
      </Box>
    </Box>
  )
}

export default EmptyComponent
