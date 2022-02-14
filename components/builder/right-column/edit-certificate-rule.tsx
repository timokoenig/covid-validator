/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { ChevronLeftIcon, DeleteIcon } from '@chakra-ui/icons'
import { Box, Button, Heading, Input, Select, Text, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import {
  CertificateRule,
  CustomRule,
  immunizationTypeName,
  IMMUNIZATION_TYPE_BOOSTER,
  IMMUNIZATION_TYPE_FULL,
  IMMUNIZATION_TYPE_FULL_RECOVERY,
  IMMUNIZATION_TYPE_PARTIAL,
  Language,
} from '../../../utils/certlogic'
import tests from '../../../utils/tests'
import vaccines from '../../../utils/vaccines'
import ConfirmModal from '../../modal/confirm'
import LanguageModal from '../modal/language'

type Props = {
  customRule: CustomRule
  certificateRule: CertificateRule
  onChange: (customRule: CustomRule) => void
  onBack: () => void
}

const EditCertificateRule = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenConfirm, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure()
  const [result, setResult] = useState<boolean>(props.certificateRule.result)
  const [validFrom, setValidFrom] = useState<number | undefined>(props.certificateRule.validFrom)
  const [validTo, setValidTo] = useState<number | undefined>(props.certificateRule.validTo)
  const [immunizationStatus, setImmunizationStatus] = useState<string | undefined>(
    props.certificateRule.immunizationStatus
  )
  const [translations, setTranslations] = useState<Language[]>(
    props.certificateRule.translations.length === 0
      ? [{ lang: 'en', desc: '' }]
      : props.certificateRule.translations
  )

  const isEditMode =
    props.customRule.rules.find(r => r.id === props.certificateRule.id) !== undefined

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
    props.onChange({
      ...props.customRule,
      rules: [
        ...props.customRule.rules.filter(r => r.id !== props.certificateRule.id),
        {
          ...props.certificateRule,
          translations,
          result,
          validFrom,
          validTo,
          immunizationStatus,
        },
      ],
    })
  }

  const onDelete = (confirm: boolean) => {
    onCloseConfirm()
    if (!confirm) return
    props.onChange({
      ...props.customRule,
      rules: props.customRule.rules.filter(r => r.id !== props.certificateRule.id),
    })
  }

  return (
    <>
      <Box flex="1" px="10" py="5" display="flex" flexDirection="column" overflow="scroll">
        <Box display="flex" flexDirection="row" mb="5">
          <Button onClick={props.onBack} mr="5">
            <ChevronLeftIcon width="5" height="5" />
          </Button>
          <Heading flex="1">Certificate Rule</Heading>
          {isEditMode && (
            <Button colorScheme="red" variant="ghost" onClick={onOpenConfirm} mr="5">
              Delete
            </Button>
          )}
          <Button colorScheme="blue" onClick={onSave}>
            Save
          </Button>
        </Box>
        <Text mb="10">Some explanation what this is</Text>
        <Box mb="10">
          <Text fontSize="xl" fontWeight="semibold" mb="2">
            Pre-Condition (when a rule should be checked)
          </Text>
          <Box display="flex" flexDirection="row">
            <Box flex="1">
              <Text fontWeight="semibold">Certificate Type</Text>
              <Text>{props.certificateRule.type}</Text>
            </Box>
            {props.certificateRule.type === 'Vaccination' && (
              <Box flex="1">
                <Text fontWeight="semibold">Vaccines</Text>
                {props.certificateRule.medicalProducts?.map(mp => (
                  <Text key={mp}>{vaccines.find(v => v.id === mp)?.name}</Text>
                ))}
              </Box>
            )}
            {props.certificateRule.type === 'Test' && (
              <Box flex="1">
                <Text fontWeight="semibold">Tests</Text>
                {props.certificateRule.medicalProducts?.map(mp => (
                  <Text key={mp}>{tests.find(t => t.id === mp)?.name}</Text>
                ))}
              </Box>
            )}
          </Box>
        </Box>
        <Box mb="10">
          <Text fontSize="xl" fontWeight="semibold" mb="2">
            Condition (what should be checked)
          </Text>
          <Box display="flex" flexDirection="row" mb="5">
            {props.certificateRule.type === 'Vaccination' && (
              <Box flex="1">
                <Text fontWeight="semibold">Type</Text>
                <Select
                  value={immunizationStatus}
                  width={200}
                  onChange={e => setImmunizationStatus(e.target.selectedOptions[0].value)}
                >
                  <option value={IMMUNIZATION_TYPE_PARTIAL}>
                    {immunizationTypeName(IMMUNIZATION_TYPE_PARTIAL)}
                  </option>
                  <option value={IMMUNIZATION_TYPE_FULL}>
                    {immunizationTypeName(IMMUNIZATION_TYPE_FULL)}
                  </option>
                  <option value={IMMUNIZATION_TYPE_FULL_RECOVERY}>
                    {immunizationTypeName(IMMUNIZATION_TYPE_FULL_RECOVERY)}
                  </option>
                  <option value={IMMUNIZATION_TYPE_BOOSTER}>
                    {immunizationTypeName(IMMUNIZATION_TYPE_BOOSTER)}
                  </option>
                </Select>
              </Box>
            )}
            <Box flex="1">
              <Text fontWeight="semibold">Result</Text>
              <Select
                value={result ? 'true' : 'false'}
                width={200}
                onChange={e => setResult(e.target.selectedOptions[0].value === 'true')}
              >
                <option value="true">VALID</option>
                <option value="false">INVALID</option>
              </Select>
            </Box>
          </Box>
          <Box display="flex" flexDirection="row">
            <Box flex="1">
              <Text fontWeight="semibold">ValidFrom (optional)</Text>
              <Input
                placeholder="in days"
                value={validFrom}
                style={{ width: 200 }}
                onChange={e =>
                  setValidFrom(e.target.value === '' ? undefined : parseInt(e.target.value, 10))
                }
              />
            </Box>
            <Box flex="1">
              <Text fontWeight="semibold">ValidTo (optional)</Text>
              <Input
                placeholder="in days"
                value={validTo}
                style={{ width: 200 }}
                onChange={e =>
                  setValidTo(e.target.value === '' ? undefined : parseInt(e.target.value, 10))
                }
              />
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
      <ConfirmModal
        title="Are you sure?"
        message="The certificate rule will be deleted irrevocably from your device. It will not be delete from other devices."
        isOpen={isOpenConfirm}
        onClose={onDelete}
      />
    </>
  )
}

export default EditCertificateRule