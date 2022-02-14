/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { ChevronLeftIcon, DeleteIcon } from '@chakra-ui/icons'
import { Box, Button, Heading, Input, Select, Text, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { CustomRule, Language } from '../../../utils/certlogic'
import LanguageModal from '../modal/language'

type Props = {
  customRule: CustomRule
  onChange: (customRule: CustomRule) => void
  onBack: () => void
}

const EditCertificateRule = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [translations, setTranslations] = useState<Language[]>([{ lang: 'en', desc: '' }])

  const type = 'vaccination'

  const onAddTranslation = (lang: string) => {
    onClose()
    if (translations.find(trans => trans.lang === lang) !== undefined) return
    setTranslations([...translations, { lang, desc: '' }])
  }

  const onChangeTranslation = (lang: string, desc: string) => {
    const updated: Language[] = []
    for (const t of translations) {
      if (t.lang === lang) {
        updated.push({ lang, desc })
      } else {
        updated.push(t)
      }
    }
    setTranslations(updated)
  }

  const onDeleteTranslation = (lang: string) => {
    setTranslations(translations.filter(trans => trans.lang !== lang))
  }

  const onSave = () => {
    // TODO check if everything is set
    // then save rule
  }

  return (
    <>
      <Box flex="1" px="10" py="5" display="flex" flexDirection="column" overflow="scroll">
        <Box display="flex" flexDirection="row" mb="5">
          <Button onClick={props.onBack} mr="5">
            <ChevronLeftIcon width="5" height="5" />
          </Button>
          <Heading flex="1">Certificate Rule</Heading>
          <Button colorScheme="blue" onClick={onSave}>
            Save
          </Button>
        </Box>
        <Text mb="10">Some explanation what this is</Text>
        <Box mb="10">
          <Text fontSize="xl" fontWeight="semibold" mb="2">
            Pre-Condition (condition when a rule should be checked)
          </Text>
          <Box display="flex" flexDirection="row">
            <Box flex="1">
              <Text fontWeight="semibold">Certificate Type</Text>
              <Text>Vaccination</Text>
            </Box>
            <Box flex="1">
              <Text fontWeight="semibold">Vaccines</Text>
              <Text>BioNTech</Text>
              <Text>Moderna</Text>
            </Box>
          </Box>
        </Box>
        <Box mb="10">
          <Text fontSize="xl" fontWeight="semibold" mb="2">
            Condition (condition what should be checked)
          </Text>
          <Box display="flex" flexDirection="row" mb="5">
            {type === 'vaccination' && (
              <Box flex="1">
                <Text fontWeight="semibold">Type</Text>
                <Select value="full" width={200}>
                  <option value="full">Full Vaccination</option>
                  <option value="booster">Booster</option>
                </Select>
              </Box>
            )}
            <Box flex="1">
              <Text fontWeight="semibold">Result</Text>
              <Select value="valid" width={200}>
                <option value="valid">VALID</option>
                <option value="invalid">INVALID</option>
              </Select>
            </Box>
          </Box>
          <Box display="flex" flexDirection="row">
            <Box flex="1">
              <Text fontWeight="semibold">ValidFrom (optional)</Text>
              <Input placeholder="in days" style={{ width: 200 }} />
            </Box>
            <Box flex="1">
              <Text fontWeight="semibold">ValidTo (optional)</Text>
              <Input placeholder="in days" style={{ width: 200 }} />
            </Box>
          </Box>
        </Box>
        <Box mb="10">
          <Box display="flex" flexDirection="row">
            <Text fontSize="xl" fontWeight="semibold" flex="1">
              Translations
            </Text>
            <Button colorScheme="blue" onClick={onOpen}>
              Add
            </Button>
          </Box>
          {translations.map(trans => (
            <Box key={trans.lang} display="flex" flexDirection="row" py="5">
              <Box display="flex" alignItems="center">
                <Text fontWeight="semibold">{trans.lang.toUpperCase()}</Text>
              </Box>
              <Input
                value={trans.desc}
                mx="5"
                onChange={e => onChangeTranslation(trans.lang, e.target.value)}
              />
              {trans.lang !== 'en' && (
                <Button colorScheme="red" onClick={() => onDeleteTranslation(trans.lang)}>
                  <DeleteIcon width="4" height="4" />
                </Button>
              )}
            </Box>
          ))}
        </Box>
      </Box>
      <LanguageModal isOpen={isOpen} onClose={onClose} onClick={onAddTranslation} />
    </>
  )
}

export default EditCertificateRule
