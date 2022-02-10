import React from 'react'
import { Box, Button, Text } from '@chakra-ui/react'
import { MinusIcon } from '@chakra-ui/icons'
import { useTranslation } from 'react-i18next'
import { counter, decrease } from '../../state/counter'
import { showCounter } from '../../state/show-counter'

const Counter = () => {
  const { t } = useTranslation('common')
  const count = counter.use()
  const showComponent = showCounter.use()

  if (!showComponent) return <Box />

  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      bg="blue.400"
      boxShadow="xl"
      mb="10"
      p="5"
      display="flex"
      flexDirection="row"
      verticalAlign="center"
    >
      <Box flex="1" verticalAlign="center">
        <Text fontWeight="semibold" textTransform="uppercase" color="white">
          {t('counter')}
        </Text>
        <Text fontSize="2xl" color="white">
          {count}
        </Text>
      </Box>
      <Box mt="1">
        <Button
          onClick={decrease}
          size="lg"
          variant="outline"
          color="white"
          backgroundColor="blue.400"
          _hover={{ bg: 'blue.300' }}
          _active={{ bg: 'blue.400' }}
        >
          <MinusIcon width="5" height="5" />
        </Button>
      </Box>
    </Box>
  )
}

export default Counter
