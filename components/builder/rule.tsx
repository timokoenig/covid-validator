import { DeleteIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Rule as RuleModel } from '../../utils/certlogic'

type Props = {
  rule: RuleModel
  onDelete: () => void
  onEdit: () => void
}

const Rule = (props: Props) => {
  return (
    <Box borderRadius="10" backgroundColor="gray.700" padding="5">
      <Flex>
        <Box flex="1" display="flex" flexDireaction="row" alignItems="center">
          <Box>
            <Text fontWeight="semibold">{props.rule.Identifier}</Text>
            <Text>Version {props.rule.Version}</Text>
          </Box>
        </Box>
        <Button colorScheme="blue" onClick={props.onEdit} mr="5">
          Edit
        </Button>
        <Button colorScheme="red" onClick={props.onDelete}>
          <DeleteIcon width="3" height="3" />
        </Button>
      </Flex>
      <Box my="5">
        <Text fontWeight="semibold">Description</Text>
        <Text>
          <Text as="span" fontWeight="semibold">
            DE
          </Text>
          : Vaccination date needs to be between 14 and 270 days
        </Text>
      </Box>
      <Box my="5">
        <Text fontWeight="semibold">Pre-Condition (condition when a rule should be checked)</Text>
        <Text>Vaccination; BioNTech</Text>
      </Box>
      <Box my="5">
        <Text fontWeight="semibold">Condition (condition what should be checked)</Text>
        <Text>Date &gt; VaccinationDate + 14 days</Text>
        <Text>Date &lt; VaccinationDate + 270 days</Text>
      </Box>
    </Box>
  )
}

export default Rule
