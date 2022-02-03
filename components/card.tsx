import React, { useState } from 'react'
import { Button, Box, Text, Center } from '@chakra-ui/react'
import CardHeader from './card-header'
import dynamic from 'next/dynamic'

const BarcodeScannerComponent = dynamic(() => import('react-qr-barcode-scanner'), {
  ssr: false,
})

const Card = () => {
  const [scanMode, setScanMode] = useState<boolean>(false)
  return (
    <Box borderRadius="lg" overflow="hidden" bg="blue.400" boxShadow="xl" mb="10">
      <CardHeader />

      {scanMode ? (
        <>
          <BarcodeScannerComponent
            onUpdate={() => {}}
            // onUpdate={(_, result) => {
            //   if (!result || result.getText() == data) return
            //   setData(result.getText())
            // }}
          />
          {/* <p>{data}</p> */}
          <Center py="5">
            <Text color="white">Hold the QR Code in front of your camera</Text>
          </Center>
          <Center pb="5">
            <Button
              size="lg"
              variant="outline"
              color="white"
              backgroundColor={'blue.400'}
              _hover={{ bg: 'blue.300' }}
              _active={{ bg: 'blue.400' }}
              onClick={() => setScanMode(false)}
            >
              Close Camera
            </Button>
          </Center>
        </>
      ) : (
        <Box p="6">
          <Center py="10">
            <Button
              size="lg"
              variant="outline"
              color="white"
              backgroundColor={'blue.400'}
              _hover={{ bg: 'blue.300' }}
              _active={{ bg: 'blue.400' }}
              onClick={() => setScanMode(true)}
            >
              Check Certificate
            </Button>
          </Center>
          <Center pb="10">
            <Text fontWeight="semibold" color="white">
              some more information for the user
            </Text>
          </Center>
        </Box>
      )}
    </Box>
  )
}

export default Card
