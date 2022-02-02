import React, { useEffect } from 'react'
import { Container, Heading } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { decodeOnly, DCCData } from 'dcc-decoder'
import dccConfig from '../utils/dccConfig'

const BarcodeScannerComponent = dynamic(() => import('react-qr-barcode-scanner'), {
  ssr: false,
})

const IndexPage = () => {
  const [data, setData] = React.useState<string>('')

  useEffect(() => {
    if (!data.startsWith('HC1:')) return
    ;(async () => {
      const dccData = {
        signingKeys: dccConfig.certs,
        // valueSets: dccConfig.valueSets,
      } as DCCData
      const result = await decodeOnly({
        source: [data],
        dccData: dccData,
      })
      if (result.error) {
        console.log('Decoding error', result.error)
        return
      }
      if (result.ruleErrors) {
        console.log('Rule errors', result.ruleErrors)
        return
      }
      console.log(result.cert?.nam)
    })()
  }, [data])

  return (
    <Container marginTop={10}>
      <Heading as="h1" size="2xl">
        Covid Check
      </Heading>
      <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={(_, result) => {
          if (!result || result.getText() == data) return
          setData(result.getText())
        }}
      />
      <p>{data}</p>
    </Container>
  )
}

export default IndexPage
