import { Flex, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'
import LeftColumn from '../components/builder/left-column'
import RightColumn from '../components/builder/right-column'
import PageMeta from '../components/page-meta'
import { builder, setRules } from '../state/builder'
import { CustomRule } from '../utils/certlogic'
import defaultImmunizationRulesGermany from '../utils/default-immunization-rules-germany'

const BuilderPage = () => {
  const { t } = useTranslation('common')
  const toast = useToast()
  const builderState = builder.use()
  const [currentCustomRule, setCurrentCustomRule] = useState<CustomRule | null>(null)

  const showToast = () => {
    toast({
      title: t('builder.updated'),
      status: 'success',
      duration: 3000,
    })
  }

  const onCreate = () => {
    setCurrentCustomRule({
      id: '',
      name: '',
      description: '',
      rules: [],
      // at the moment we will prefill the immunization rules with the default for Germany
      // might change it in the future
      immunizationRules: defaultImmunizationRulesGermany,
    })
  }

  const onUpdate = (customRule: CustomRule) => {
    const updatedRule = { ...customRule, id: customRule.id === '' ? uuidv4() : customRule.id }
    setRules([...builderState.customRules.filter(r => r.id !== customRule.id), updatedRule])
    setCurrentCustomRule(updatedRule)
    showToast()
  }

  const onDelete = () => {
    setRules([...builderState.customRules.filter(r => r.id !== currentCustomRule?.id)])
    setCurrentCustomRule(null)
    showToast()
  }

  return (
    <>
      <PageMeta allowIndex={false} />
      <Flex height="100vh">
        <LeftColumn
          customRule={currentCustomRule}
          onCreate={onCreate}
          onChange={setCurrentCustomRule}
        />
        <RightColumn customRule={currentCustomRule} onChange={onUpdate} onDelete={onDelete} />
      </Flex>
    </>
  )
}

export default BuilderPage
