import { Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import LeftColumn from '../components/builder/left-column'
import RightColumn from '../components/builder/right-column'
import PageMeta from '../components/page-meta'

const BuilderPage = () => {
  const [rules, setRules] = useState<string[]>([])
  return (
    <>
      <PageMeta allowIndex={false} />
      <Flex color="white" height="100vh">
        <LeftColumn />
        <RightColumn rules={rules} onChange={setRules} />
      </Flex>
    </>
  )
}

export default BuilderPage
