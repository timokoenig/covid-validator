import React from 'react'
import { Button, Box, Text, Center } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

type Props = {
  onClickStart: () => void
}

const CameraStartView = (props: Props) => {
  const { t } = useTranslation('common')

  return (
    <Box p="6">
      <Center py="10">
        <Button
          size="lg"
          variant="outline"
          color="white"
          backgroundColor="blue.400"
          _hover={{ bg: 'blue.300' }}
          _active={{ bg: 'blue.400' }}
          onClick={props.onClickStart}
        >
          {t('scan.button')}
        </Button>
      </Center>
      <Center pb="10">
        <Text fontWeight="semibold" color="white" textAlign="center">
          {t('scan.note.permission')}
        </Text>
      </Center>
      <Center pb="10">
        <Text color="white" textAlign="center">
          {t('scan.note.rules')}
        </Text>
      </Center>
    </Box>
  )
}

export default CameraStartView
