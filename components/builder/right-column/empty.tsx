import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Empty = () => {
  const { t } = useTranslation('common')
  return (
    <Box flex="1" px="10" py="5" display="flex" flexDirection="column" overflow="scroll">
      <Box p="10">
        <Text textAlign="center">{t('builder.placeholder')}</Text>
      </Box>
    </Box>
  )
}

export default Empty
