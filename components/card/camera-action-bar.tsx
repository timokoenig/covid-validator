import React from 'react'
import { RepeatIcon } from '@chakra-ui/icons'
import { Button, Box } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

type Props = {
  onClickCamera: () => void
  onClickClose: () => void
}

const CameraActionBar = (props: Props) => {
  const { t } = useTranslation('common')

  return (
    <Box pb="5" px="5" display="flex" alignItems="center">
      <Box flex="1">
        <Button
          size="md"
          variant="outline"
          color="white"
          backgroundColor="blue.400"
          _hover={{ bg: 'blue.300' }}
          _active={{ bg: 'blue.400' }}
          onClick={props.onClickCamera}
        >
          <RepeatIcon width="6" height="6" />
        </Button>
      </Box>
      <Box flex="1">
        <Button
          size="lg"
          variant="outline"
          color="white"
          backgroundColor="blue.400"
          _hover={{ bg: 'blue.300' }}
          _active={{ bg: 'blue.400' }}
          onClick={props.onClickClose}
        >
          {t('camera.close')}
        </Button>
      </Box>
      <Box flex="1" />
    </Box>
  )
}

export default CameraActionBar
