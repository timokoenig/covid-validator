import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import LeftColumn from '../components/builder/left-column'
import PageMeta from '../components/page-meta'

const BuilderPage = () => {
  return (
    <>
      <PageMeta allowIndex={false} />
      <Flex color="white" height="100vh">
        <LeftColumn />
        <Box flex="1" px="10" py="5">
          <Text>Box 3</Text>
        </Box>
      </Flex>
    </>
  )
}

export default BuilderPage
