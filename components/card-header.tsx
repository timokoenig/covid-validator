import React, { useState } from 'react'
import { Button, Text, Image, Box, Spacer, useDisclosure } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import RuleModal from './rule-modal'
import PurposeModal from './purpose-modal'
import countries from '../utils/countries'
import purpose from '../utils/purpose'

const CardHeader = () => {
  const { isOpen: isOpenRule, onOpen: onOpenRule, onClose: onCloseRule } = useDisclosure()
  const { isOpen: isOpenPurpose, onOpen: onOpenPurpose, onClose: onClosePurpose } = useDisclosure()
  const [selection, setSelection] = useState<{ country: string; state: string }>({
    country: 'de',
    state: '',
  })
  const [selectionPurpose, setSelectionPurpose] = useState<string>(purpose[0])

  const country = countries.find(item => item.code == selection.country) ?? countries[0]
  const state = country?.states.find(item => item.code == selection.state) ?? country.states[0]

  return (
    <>
      <Box display="flex" flexDirection="row">
        <Button
          px="5"
          py="10"
          isFullWidth
          backgroundColor={'blue.300'}
          _hover={{ bg: 'blue.200' }}
          _active={{ bg: 'blue.300' }}
          display="flex"
          flexDirection="row"
          alignItems="center"
          onClick={onOpenRule}
          borderRadius="0"
        >
          <Image
            src={`https://raw.githubusercontent.com/lipis/flag-icons/main/flags/1x1/${country.code}.svg`}
            width="5"
            height="5"
            borderRadius="10"
            marginRight="2"
          />
          <Text fontSize="h4" fontWeight="bold" color="white">
            {country.name} / {state.name}
          </Text>
          <ChevronDownIcon w={8} h={8} color="white" />
          <Spacer />
        </Button>
        {selection.country == 'de' && (
          <Button
            pl="10"
            pr="5"
            py="10"
            backgroundColor={'blue.300'}
            _hover={{ bg: 'blue.200' }}
            _active={{ bg: 'blue.300' }}
            display="flex"
            flexDirection="row"
            alignItems="center"
            onClick={onOpenPurpose}
            borderRadius="0"
          >
            <Text fontSize="h4" fontWeight="bold" color="white">
              {selectionPurpose}
            </Text>
            <ChevronDownIcon w={8} h={8} color="white" />
          </Button>
        )}
      </Box>
      <RuleModal isOpen={isOpenRule} onClose={onCloseRule} onChange={setSelection} />
      <PurposeModal
        isOpen={isOpenPurpose}
        onClose={onClosePurpose}
        onChange={setSelectionPurpose}
      />
    </>
  )
}

export default CardHeader