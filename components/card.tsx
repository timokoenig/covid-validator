import React, { useEffect, useState } from 'react'
import { Button, Box, Text, Center, useDisclosure, AspectRatio } from '@chakra-ui/react'
import CardHeader from './card-header'
import dynamic from 'next/dynamic'
import validateCertificate from '~/utils/validate-certificate'
import { VerificationResult } from 'dcc-decoder'
import ResultModal from './result-modal'
import LoadingIndicator from './loading-indicator'

const BarcodeScannerComponent = dynamic(() => import('react-qr-barcode-scanner'), {
  ssr: false,
})

const Card = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [scanMode, setScanMode] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<string>('')
  const [certificateResult, setCertificateResult] = useState<VerificationResult | undefined>()

  const onModalClose = () => {
    setData('')
    setCertificateResult(undefined)
    setLoading(false)
    onClose()
  }

  useEffect(() => {
    if (!data.startsWith('HC1:')) return
    validateCertificate(data)
      .then(setCertificateResult)
      .then(onOpen)
      .catch(err => {
        console.log(err)
        setLoading(false)
        setData('')
        setCertificateResult(undefined)
      })
  }, [data])

  return (
    <>
      <Box borderRadius="lg" overflow="hidden" bg="blue.400" boxShadow="xl" mb="10">
        <CardHeader />

        {scanMode ? (
          <>
            <Box>
              <AspectRatio ratio={1}>
                <>
                  <BarcodeScannerComponent
                    onUpdate={(_, result) => {
                      if (!result || result.getText() == data) return
                      setData(result.getText())
                      setLoading(true)
                    }}
                    delay={0}
                  />
                  {loading && <LoadingIndicator />}
                </>
              </AspectRatio>
            </Box>
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
              <Text fontWeight="semibold" color="white" textAlign="center" px="10">
                Make sure to check the selected rules and confirm with your local regulations.
                Otherwise it might come to invalid certificate validations.
              </Text>
            </Center>
          </Box>
        )}
      </Box>
      <ResultModal isOpen={isOpen} onClose={onModalClose} result={certificateResult} />
    </>
  )
}

export default Card
