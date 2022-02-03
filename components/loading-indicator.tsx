import React from 'react'
import { Box, Spinner } from '@chakra-ui/react'

const LoadingIndicator = () => (
  <Box bg="rgba(255, 255, 255, 0.5)">
    <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
  </Box>
)

export default LoadingIndicator
