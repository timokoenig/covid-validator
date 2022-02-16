import { AspectRatio, Box, Button, Center, Heading, Text, useDisclosure } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { checkCertificate, ScanResult } from '../../utils/dcc'
import ResultModal from '../modal/result'
import WrongQRCodeModal from '../modal/result/wrong-qr-code'
import CameraActionBar from './camera-action-bar'
import LoadingIndicator from './loading-indicator'

const QRCodeScanner = dynamic(() => import('./qr-code-scanner'), {
  ssr: false,
})

type Props = {
  onCloseCamera: () => void
}

const CameraScanView = (props: Props) => {
  const { t } = useTranslation('common')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenWrongQRCode,
    onOpen: onOpenWrongQRCode,
    onClose: onCloseWrongQRCode,
  } = useDisclosure()
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
                if (!qrcode.startsWith('HC1:')) {
                  // User scanned a non-DCC QR code
                  setLoading(true)
                  onOpenWrongQRCode()
                  return
                }
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
            <Box display="flex" flexDirection="row" p="5" textAlign="center" alignItems="center">
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
      <CameraActionBar
        onClickCamera={() =>
          scannerFacingMode == 'environment'
            ? setScannerFacingMode('user')
            : setScannerFacingMode('environment')
        }
        onClickClose={props.onCloseCamera}
      />
      {scanResult !== undefined && (
        <ResultModal isOpen={isOpen} onClose={onModalClose} result={scanResult} />
      )}
      <WrongQRCodeModal
        isOpen={isOpenWrongQRCode}
        onClose={() => {
          setLoading(false)
          onCloseWrongQRCode()
        }}
      />
    </>
  )
}

export default CameraScanView
