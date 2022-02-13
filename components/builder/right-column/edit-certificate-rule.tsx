import { ChevronLeftIcon } from '@chakra-ui/icons'
import { Box, Button, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { CustomRule } from '../../../utils/certlogic'

type Props = {
  customRule: CustomRule
  onChange: (customRule: CustomRule) => void
  onBack: () => void
}

const EditCertificateRule = (props: Props) => {
  return (
    <Box flex="1" px="10" py="5" display="flex" flexDirection="column" overflow="scroll">
      <Box display="flex" flexDirection="row" mb="5">
        <Button onClick={props.onBack} mr="5">
          <ChevronLeftIcon width="5" height="5" />
        </Button>
        <Heading flex="1">Certificate Rule</Heading>
        <Button colorScheme="blue" onClick={() => {}} isDisabled={true}>
          Save
        </Button>
      </Box>
      <Text mb="10">Some explanation what this is</Text>
    </Box>
  )
}

export default EditCertificateRule
