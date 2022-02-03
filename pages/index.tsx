import React from 'react'
import { Container } from '@chakra-ui/react'
// import { decodeOnly, DCCData } from 'dcc-decoder'
// import dccConfig from '../utils/dccConfig'
import Header from '../components/header'
import Card from '../components/card'
import Information from '../components/information'
import Footer from '../components/footer'

const IndexPage = () => {
  // const [data, setData] = React.useState<string>('')

  // useEffect(() => {
  //   if (!data.startsWith('HC1:')) return
  //   ;(async () => {
  //     const dccData = {
  //       signingKeys: dccConfig.certs,
  //       // valueSets: dccConfig.valueSets,
  //     } as DCCData
  //     const result = await decodeOnly({
  //       source: [data],
  //       dccData: dccData,
  //     })
  //     if (result.error) {
  //       console.log('Decoding error', result.error)
  //       return
  //     }
  //     if (result.ruleErrors) {
  //       console.log('Rule errors', result.ruleErrors)
  //       return
  //     }
  //     console.log(result.cert?.nam)
  //   })()
  // }, [data])

  return (
    <Container marginTop={10}>
      <Header />
      <Card />
      <Information />
      <Footer />
    </Container>
  )
}

export default IndexPage
