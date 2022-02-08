import React, { useEffect, useState } from 'react'
import { Button, Box, Text, Center, useDisclosure, AspectRatio, Heading } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { RepeatIcon } from '@chakra-ui/icons'
import { useTranslation } from 'react-i18next'
import { checkCertificate, ScanResult } from '../utils/dcc'
import ResultModal from './result-modal'
import LoadingIndicator from './loading-indicator'

const CardHeader = dynamic(() => import('./card-header'), {
  ssr: false,
})

const QRCodeScanner = dynamic(() => import('./qr-code-scanner'), {
  ssr: false,
})

const Card = () => {
  const { t } = useTranslation('common')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [scanMode, setScanMode] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [scannerFacingMode, setScannerFacingMode] = useState<string>('environment')
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
        // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
        if (scanResult !== undefined && scanResult.isMultiScan) {
          if ((res.certificates[0].dcc.data.payload.hcert.dgc.t?.length ?? 0) > 0) {
            const newScanResult = scanResult
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                  {error !== null && (
                    <Box flexDirection="column">
                      <Heading size="md" color="white">
                        {t('scan.error')}
                      </Heading>
                      <Text color="white">{t('scan.error.message')}</Text>
                    </Box>
                  )}
                  <QRCodeScanner
                    enableScan={!loading}
                    facingMode={scannerFacingMode}
                    onData={qrcode => {
                      if (!qrcode.startsWith('HC1:')) return
                      // TODO show error for wrongly scanned qr code
                      setLoading(true)
                      setData(qrcode)
                    }}
                    onError={setError}
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
                      <Text>{t('scan.multiscan')}</Text>
                      <Text fontWeight="semibold" fontSize="xl">
                        {scanResult
                          ? scanResult.certificates.length > 0
                            ? `${scanResult.certificates[0].dcc.data.payload.hcert.dgc.nam.gn} ${scanResult.certificates[0].dcc.data.payload.hcert.dgc.nam.fn}`
                            : 'n/a'
                          : 'n/a'}
                      </Text>
                    </Box>
                    <Button
                      size="md"
                      variant="outline"
                      color="white"
                      backgroundColor="blue.400"
                      _hover={{ bg: 'blue.300' }}
                      _active={{ bg: 'blue.400' }}
                      onClick={() => onModalClose(false)}
                    >
                      {t('abort')}
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
            <Center py="5">
              <Text color="white">{t('scan.message')}</Text>
            </Center>
            <Box pb="5" px="5" display="flex" alignItems="center">
              <Box flex="1">
                <Button
                  size="md"
                  variant="outline"
                  color="white"
                  backgroundColor="blue.400"
                  _hover={{ bg: 'blue.300' }}
                  _active={{ bg: 'blue.400' }}
                  onClick={() =>
                    scannerFacingMode == 'environment'
                      ? setScannerFacingMode('user')
                      : setScannerFacingMode('environment')
                  }
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
                  onClick={() => setScanMode(false)}
                >
                  {t('camera.close')}
                </Button>
              </Box>
              <Box flex="1" />
            </Box>
          </>
        ) : (
          <Box p="6">
            <Center py="10">
              <Button
                size="lg"
                variant="outline"
                color="white"
                backgroundColor="blue.400"
                _hover={{ bg: 'blue.300' }}
                _active={{ bg: 'blue.400' }}
                onClick={() => {
                  setError(null)
                  setScanMode(true)
                }}
              >
                {t('scan.button')}
              </Button>
            </Center>
            <Center pb="10">
              <Text fontWeight="semibold" color="white" textAlign="center" px="10">
                {t('scan.note.permission')}
              </Text>
            </Center>
            <Center pb="10">
              <Text color="white" textAlign="center" px="10">
                {t('scan.note.rules')}
              </Text>
            </Center>
          </Box>
        )}
      </Box>
      {scanResult !== undefined && (
        <ResultModal isOpen={isOpen} onClose={onModalClose} result={scanResult} />
      )}
    </>
  )
}

export default Card
