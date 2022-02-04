import React, { useEffect, useState } from 'react'
import { Button, Box, Text, Center, useDisclosure, AspectRatio } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { checkCertificate, ScanResult } from '../utils/dcc'
import ResultModal from './result-modal'
import LoadingIndicator from './loading-indicator'

const CardHeader = dynamic(() => import('./card-header'), {
  ssr: false,
})

const BarcodeScannerComponent = dynamic(() => import('react-qr-barcode-scanner'), {
  ssr: false,
})

const Card = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [scanMode, setScanMode] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<string>('')
  const [scanResult, setScanResult] = useState<ScanResult>()

  const onModalClose = (multiscan: boolean) => {
    if (!multiscan) {
      setScanResult(undefined)
    }
    setData('')
    setLoading(false)
    onClose()
  }

  useEffect(() => {
    if (data.length == 0) return
    checkCertificate(data)
      .then(res => {
        if (scanResult !== undefined && scanResult.isMultiScan) {
          if (res.certificates[0].dcc.data.payload.hcert.dgc.t?.length ?? 0 > 0) {
            let newScanResult = scanResult
            newScanResult.certificates.push(res.certificates[0])
            setScanResult(newScanResult)
          } else {
            // In case the user scanned not a test certificate he will get the TEST REQUIRED modal again
            // TODO in the future we should show a better error message
          }
        } else {
          setScanResult(res)
        }
        onOpen()
      })
      .catch(err => {
        console.log(err)
        setData('')
        setScanResult(undefined)
        setLoading(false)
      })
  }, [data])

  return (
    <>
      <Box borderRadius="lg" overflow="hidden" bg="blue.400" boxShadow="xl" mb="10">
        <CardHeader />

        {scanMode ? (
          <>
            <Box position="relative">
              <AspectRatio ratio={1}>
                <>
                  <BarcodeScannerComponent
                    onUpdate={(_, result) => {
                      if (!result || result.getText() == data) return
                      if (!result.getText().startsWith('HC1:')) return
                      setData(result.getText())
                      setLoading(true)
                    }}
                    delay={0}
                  />
                  {loading && <LoadingIndicator />}
                </>
              </AspectRatio>
              {(scanResult?.isMultiScan ?? false) && (
                <Box
                  width="100%"
                  height="100"
                  backgroundColor="rgba(255, 255, 255, 0.3)"
                  position="absolute"
                  bottom="0"
                >
                  <Box
                    display="flex"
                    flexDirection="row"
                    p="5"
                    textAlign="center"
                    alignItems="center"
                  >
                    <Box flex="1">
                      <Text>Scan test certificate for</Text>
                      <Text fontWeight="semibold" fontSize="xl">
                        Timo Koenig
                      </Text>
                    </Box>
                    <Button
                      size="md"
                      variant="outline"
                      color="white"
                      backgroundColor={'blue.400'}
                      _hover={{ bg: 'blue.300' }}
                      _active={{ bg: 'blue.400' }}
                      onClick={() => onModalClose(false)}
                    >
                      Abort
                    </Button>
                  </Box>
                </Box>
              )}
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
      <ResultModal isOpen={isOpen} onClose={onModalClose} result={scanResult} />
    </>
  )
}

export default Card
