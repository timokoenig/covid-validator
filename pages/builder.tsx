import { Flex } from '@chakra-ui/react'
import React from 'react'
import LeftColumn from '../components/builder/left-column'
import RightColumn from '../components/builder/right-column'
import PageMeta from '../components/page-meta'

const BuilderPage = () => {
  return (
    <>
      <PageMeta allowIndex={false} />
      <Flex color="white" height="100vh">
        <LeftColumn />
        <RightColumn />
      </Flex>
    </>
  )
}

export default BuilderPage
