/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { Box, Button, Heading, Text, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { JSONObject } from '../../../../utils/builder/types'
import { CustomRule, ImmunizationRule } from '../../../../utils/certlogic'
import vaccines from '../../../../utils/vaccines'
import ConfirmModal from '../../../modal/confirm'
import BuilderStack from '../../stack'

type Props = {
  customRule: CustomRule
  immunizationRule: ImmunizationRule
  onChange: (customRule: CustomRule) => void
  onBack: () => void
}

const EditImmunizationRule = (props: Props) => {
  const { t } = useTranslation('common')
  const { isOpen: isOpenConfirm, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useDisclosure()
  const [data, setData] = useState<JSONObject | null>(props.immunizationRule.rule as JSONObject)

  const isEditMode =
    props.customRule.immunizationRules.find(r => r.id === props.immunizationRule.id) !== undefined

  const onSave = () => {
    // TODO check if everything is set
    props.onChange({
      ...props.customRule,
      immunizationRules: [
        ...props.customRule.immunizationRules.filter(r => r.id !== props.immunizationRule.id),
        {
          ...props.immunizationRule,
          rule: data,
        },
      ],
    })
  }

  const onDelete = (confirm: boolean) => {
    onCloseConfirm()
    if (!confirm) return
    props.onChange({
      ...props.customRule,
      immunizationRules: props.customRule.immunizationRules.filter(
        r => r.id !== props.immunizationRule.id
      ),
    })
  }

  return (
    <>
      <Box flex="1" px="10" py="5" display="flex" flexDirection="column" overflow="scroll">
        <Box display="flex" flexDirection="row" mb="5">
          <Button onClick={props.onBack} mr="5">
            <ChevronLeftIcon width="5" height="5" />
          </Button>
          <Heading flex="1">{t('builder.rules.immunization')}</Heading>
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
                {t('builder.immunization.type')}
              </Text>
              <Text>{t(props.immunizationRule.type)}</Text>
            </Box>
          </Box>
        </Box>
        <Box mb="10">
          <Box display="flex" flexDirection="row">
            <Box flex="1">
              <Text fontSize="xl" fontWeight="semibold" mb="5">
                {t('vaccines')}
              </Text>
              {props.immunizationRule.medicalProducts
                .map(mp => vaccines.find(vac => vac.id === mp)?.name ?? mp)
                .map(mp => (
                  <Text key={mp}>{mp}</Text>
                ))}
            </Box>
          </Box>
        </Box>
        <Text fontSize="xl" fontWeight="semibold" mb="5">
          {t('builder.edit.rule')}
        </Text>
        <BuilderStack data={data} onChange={setData} />
      </Box>
      <ConfirmModal
        title={t('builder.delete.confirm')}
        message={t('builder.delete.confirm.message')}
        isOpen={isOpenConfirm}
        onClose={onDelete}
      />
    </>
  )
}

export default EditImmunizationRule
