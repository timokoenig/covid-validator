/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { ChevronLeftIcon, DeleteIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { JSONObject } from '../../../utils/builder/types'
import { CertificateRule, CustomRule, Language } from '../../../utils/certlogic'
import ConfirmModal from '../../modal/confirm'
import LanguageModal from '../modal/language'
import BuilderStack from '../stack'

type Props = {
  customRule: CustomRule
  certificateRule: CertificateRule
  onChange: (customRule: CustomRule) => void
  onBack: () => void
}

const EditCertificateRule = (props: Props) => {
  const { t } = useTranslation('common')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenConfirm, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure()
  const [data, setData] = useState<JSONObject | null>(props.certificateRule.rule)
  // const [validFrom, setValidFrom] = useState<number | undefined>(props.certificateRule.validFrom)
  // const [validTo, setValidTo] = useState<number | undefined>(props.certificateRule.validTo)
  // const [immunizationStatus, setImmunizationStatus] = useState<string | undefined>(
  //   props.certificateRule.immunizationStatus
  // )
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
    for (const trans of translations) {
      if (trans.lang === lang) {
        updated.push({ lang, desc })
      } else {
        updated.push(trans)
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
          rule: data,
          // validFrom,
          // validTo,
          // immunizationStatus,
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
          <Heading flex="1">{t('builder.rules.certificate')}</Heading>
          {isEditMode && (
            <Button colorScheme="red" variant="ghost" onClick={onOpenConfirm} mr="5">
              {t('delete')}
            </Button>
          )}
          <Button colorScheme="blue" onClick={onSave}>
            {t('save')}
          </Button>
        </Box>
        <Box mb="10">
          <Box display="flex" flexDirection="row">
            <Box flex="1">
              <Text fontSize="xl" fontWeight="semibold" mb="5">
                {t('builder.certificate.type')}
              </Text>
              <Text>{props.certificateRule.type}</Text>
            </Box>
          </Box>
        </Box>
        <Box mb="10">
          <Box display="flex" flexDirection="row">
            <Text fontSize="xl" fontWeight="semibold" flex="1">
              {t('builder.edit.translations')}
            </Text>
            <Button colorScheme="blue" onClick={onOpen}>
              {t('add')}
            </Button>
          </Box>
          {translations.map(trans => (
            <Box key={trans.lang} display="flex" flexDirection="row" py="5">
              <InputGroup>
                <InputLeftAddon
                  children={<Text fontWeight="semibold">{trans.lang.toUpperCase()}</Text>}
                />
                <Input
                  value={trans.desc}
                  onChange={e => onChangeTranslation(trans.lang, e.target.value)}
                />
              </InputGroup>

              {trans.lang !== 'en' && (
                <Button colorScheme="red" onClick={() => onDeleteTranslation(trans.lang)} ml="5">
                  <DeleteIcon width="4" height="4" />
                </Button>
              )}
            </Box>
          ))}
        </Box>
        <Text fontSize="xl" fontWeight="semibold" mb="5">
          {t('builder.edit.rule')}
        </Text>
        <BuilderStack data={data} onChange={setData} />
      </Box>
      <LanguageModal isOpen={isOpen} onClose={onClose} onClick={onAddTranslation} />
      <ConfirmModal
        title={t('builder.rule.delete')}
        message={t('builder.rule.delete.message')}
        isOpen={isOpenConfirm}
        onClose={onDelete}
      />
    </>
  )
}

export default EditCertificateRule
