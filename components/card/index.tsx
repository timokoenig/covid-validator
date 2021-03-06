import { Box } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { enableScanner } from '../../state/app'
import CameraScanView from './camera-scan-view'
import CameraStartView from './camera-start-view'

const CardHeader = dynamic(() => import('./card-header'), {
  ssr: false,
})

const Card = () => {
  const [scanMode, setScanMode] = useState<boolean>(false)

  return (
    <Box borderRadius="lg" overflow="hidden" bg="blue.400" boxShadow="xl" mb="10">
      <CardHeader />

      {scanMode ? (
        <CameraScanView onCloseCamera={() => setScanMode(false)} />
      ) : (
        <CameraStartView
          onClickStart={() => {
            enableScanner()
            setScanMode(true)
          }}
        />
      )}
    </Box>
  )
}

export default Card
