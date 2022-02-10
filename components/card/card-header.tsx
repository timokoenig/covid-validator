import { ChevronDownIcon } from '@chakra-ui/icons'
import { Box, Button, Text, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import countries from '../../utils/countries'
import purpose from '../../utils/purpose'
import Flag from '../flag'
import PurposeModal from '../modal/purpose'
import RuleModal from '../modal/rule'

const CardHeader = () => {
  const { t } = useTranslation('country')
  const { t: tCommon } = useTranslation('common')
  const { isOpen: isOpenRule, onOpen: onOpenRule, onClose: onCloseRule } = useDisclosure()
  const { isOpen: isOpenPurpose, onClose: onClosePurpose } = useDisclosure()
  const [selection, setSelection] = useState<{ country: string; state: string }>({
    country: localStorage.getItem('country') ?? 'DE',
    state: localStorage.getItem('state') ?? '',
  })
  const [selectionPurpose, setSelectionPurpose] = useState<string>(
    localStorage.getItem('purpose') ?? purpose(tCommon)[0].title
  )

  const allCountries = countries(t)
  const country = allCountries.find(item => item.code == selection.country) ?? allCountries[0]
  const state = country.states.find(item => item.code == selection.state) ?? country.states[0]

  return (
    <>
      <Box display="flex" flexDirection="row">
        <Button
          px="6"
          pt="5"
          pb="1"
          h="auto"
          backgroundColor="blue.300"
          _hover={{ bg: 'blue.200' }}
          _active={{ bg: 'blue.300' }}
          color="white"
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          flexGrow="1"
          alignItems="center"
          justifyItems="stretch"
          justifyContent="space-between"
          onClick={onOpenRule}
          borderRadius="0"
        >
          <Box>
            <Flag country={country.code.toLowerCase()} size={25} />
          </Box>
          <Box textAlign="center" flex="1" mx="6">
            <Text fontSize="lg" wordBreak="break-word" whiteSpace="normal" fontWeight="bold">
              {country.name}
            </Text>
            <Text fontSize="md" wordBreak="break-word" whiteSpace="normal" fontWeight="400">
              {state.name}
            </Text>
          </Box>
          <Text fontSize="lg" justifySelf="flex-end" fontWeight="bold" color="white">
            {selectionPurpose}
          </Text>
          <ChevronDownIcon mt="1" flex="1 0 100%" w={6} h={6} color="white" />
        </Button>
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
