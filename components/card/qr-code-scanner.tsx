import jpeg from 'jpeg-js'
import jsQR from 'jsqr'
import React, { useEffect, useRef } from 'react'
import Webcam from 'react-webcam'

const DELAY = 500
const SIZE = 800

type Props = {
  onData: (data: string) => void
  onError: (error: string) => void
  enableScan: boolean
  facingMode?: string
}

const QRCodeScanner = (props: Props) => {
  const ref = useRef<Webcam>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current === null) return
      if (!props.enableScan) return
      const image = ref.current.getScreenshot({ width: SIZE, height: SIZE })
      if (image === null) return
      const jpegData = Buffer.from(image.replace('data:image/jpeg;base64,', ''), 'base64')
      const rawImageData = jpeg.decode(jpegData)
      const code = jsQR(Uint8ClampedArray.from(rawImageData.data), SIZE, SIZE)
      if (code === null || code.data.length == 0) return
      props.onData(code.data)
    }, DELAY)

    return () => {
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  return (
    <Webcam
      audio={false}
      height={SIZE}
      ref={ref}
      screenshotFormat="image/jpeg"
      width={SIZE}
      videoConstraints={{
        facingMode: props.facingMode ?? 'environment',
      }}
      onUserMediaError={err =>
        typeof err == 'string' ? props.onError(err) : props.onError(err.message)
      }
    />
  )
}

export default QRCodeScanner
