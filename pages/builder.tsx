import { Flex, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import LeftColumn from '../components/builder/left-column'
import ConfirmModal from '../components/builder/modal/confirm'
import LoadModal from '../components/builder/modal/load'
import RightColumn from '../components/builder/right-column'
import PageMeta from '../components/page-meta'
import { builder, setRules } from '../state/builder'
import { CustomRule } from '../utils/certlogic'

const BuilderPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()
  const toast = useToast()
  const builderState = builder.use()
  const [currentCustomRule, setCurrentCustomRule] = useState<CustomRule>({
    id: '',
    name: '',
    description: '',
    rules: [],
  })

  // new rule if current rule is not saved in the builder state
  const isNewRule = builderState.customRules.find(r => r.id == currentCustomRule.id) === undefined

  const onLoad = (customRule: CustomRule) => {
    setCurrentCustomRule(customRule)
    onClose()
  }

  const showToast = () => {
    toast({
      title: 'Rules updated',
      status: 'success',
      duration: 3000,
    })
  }

  const onSave = () => {
    if (currentCustomRule.name === '') return
    const savedRule = {
      ...currentCustomRule,
      id: currentCustomRule.id === '' ? uuidv4() : currentCustomRule.id,
    }
    setRules([...builderState.customRules.filter(r => r.id !== currentCustomRule.id), savedRule])
    setCurrentCustomRule(savedRule)
    showToast()
  }

  const onUpdate = (customRule: CustomRule) => {
    const updatedRule = { ...customRule, id: customRule.id === '' ? uuidv4() : customRule.id }
    setRules([...builderState.customRules.filter(r => r.id !== customRule.id), updatedRule])
    setCurrentCustomRule(updatedRule)
    showToast()
  }

  const onDelete = (confirm: boolean) => {
    onCloseDelete()
    if (!confirm) return
    setRules([...builderState.customRules.filter(r => r.id !== currentCustomRule.id)])
    setCurrentCustomRule({ id: '', name: '', description: '', rules: [] })
    showToast()
  }

  return (
    <>
      <PageMeta allowIndex={false} />
      <Flex color="white" height="100vh">
        <LeftColumn
          customRule={currentCustomRule}
          isNewRule={isNewRule}
          onLoad={onOpen}
          onSave={onSave}
          onChange={setCurrentCustomRule}
          onDelete={onOpenDelete}
        />
        <RightColumn customRule={currentCustomRule} onChange={onUpdate} />
      </Flex>
      <LoadModal isOpen={isOpen} onClose={onClose} onClick={onLoad} />
      <ConfirmModal ruleName={currentCustomRule.name} isOpen={isOpenDelete} onClose={onDelete} />
    </>
  )
}

export default BuilderPage
