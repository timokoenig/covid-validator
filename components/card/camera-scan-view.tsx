import { AspectRatio, Box, Button, Center, Heading, Text, useDisclosure } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DCC } from '../../utils/dcc'
import { DCCScanner } from '../../utils/dcc-scanner'
import { dislpayName } from '../../utils/helper'
import ResultModal from '../modal/result'
import CameraActionBar from './camera-action-bar'
import LoadingIndicator from './loading-indicator'

const QRCodeScanner = dynamic(() => import('./qr-code-scanner'), {
  ssr: false,
})

export type ScanResult = {
  certificates: DCC[]
  error: Error | null
  multiscan: string[]
}

export class WrongQRCodeError extends Error {}

const dccScanner = new DCCScanner()

type Props = {
  onCloseCamera: () => void
}

const CameraScanView = (props: Props) => {
  const { t } = useTranslation('common')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [error, setError] = useState<string | null>(null)
  const [scannerFacingMode, setScannerFacingMode] = useState<string>('environment')
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<string>('')
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)

  const onModalClose = () => {
    if (dccScanner.isMultiScanNecessary().length === 0) {
      setScanResult(null)
      dccScanner.clear()
    }
    setData('')
    setLoading(false)
    onClose()
  }

  useEffect(() => {
    if (data.length == 0) return
    dccScanner
      .scan(data)
      .then(() => {
        const multiscanResult = dccScanner.isMultiScanNecessary()
        setScanResult({
          certificates: dccScanner.certificates,
          error: null,
          multiscan: multiscanResult,
        })
        onOpen()
      })
      .catch((err: Error) => {
        const multiscanResult = dccScanner.isMultiScanNecessary()
        setScanResult({
          certificates: dccScanner.certificates,
          error: err,
          multiscan: multiscanResult,
        })
        onOpen()
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
                setLoading(true)
                if (!qrcode.startsWith('HC1:')) {
                  // User scanned a non-DCC QR code
                  setScanResult({
                    certificates: [],
                    error: new WrongQRCodeError(),
                    multiscan: [],
                  })
                  onOpen()
                  return
                }
                setData(qrcode)
              }}
              onError={setError}
            />
            {loading && <LoadingIndicator />}
          </>
        </AspectRatio>
        {(scanResult?.multiscan.length ?? 0) > 0 && (
          <Box
            width="100%"
            height="100"
            backgroundColor="rgba(255, 255, 255, 0.5)"
            position="absolute"
            bottom="0"
          >
            <Box display="flex" flexDirection="row" p="5" textAlign="center" alignItems="center">
              <Box flex="1">
                <Text>{t('scan.multiscan')}</Text>
                <Text fontWeight="semibold" fontSize="xl">
                  {scanResult
                    ? scanResult.certificates.length > 0
                      ? `${dislpayName(scanResult.certificates[0].data.payload.hcert.dgc.nam)}`
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
                onClick={() => {
                  setScanResult(null)
                  dccScanner.clear()
                  onModalClose()
                }}
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
      {scanResult !== null && (
        <ResultModal isOpen={isOpen} onClose={onModalClose} result={scanResult} />
      )}
    </>
  )
}

export default CameraScanView
