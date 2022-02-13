import { Flex, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import LeftColumn from '../components/builder/left-column'
import LoadModal from '../components/builder/modal/load'
import RightColumn from '../components/builder/right-column'
import PageMeta from '../components/page-meta'
import { builder, setRules } from '../state/builder'
import { CustomRule } from '../utils/certlogic'

const BuilderPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const builderState = builder.use()
  const [currentCustomRule, setCurrentCustomRule] = useState<CustomRule | null>(null)

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

  const onCreate = () => {
    setCurrentCustomRule({
      id: '',
      name: '',
      description: '',
      rules: [],
      immunizationRules: [],
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
      <Flex color="white" height="100vh">
        <LeftColumn
          customRule={currentCustomRule}
          onLoad={onOpen}
          onCreate={onCreate}
          onChange={setCurrentCustomRule}
        />
        <RightColumn customRule={currentCustomRule} onChange={onUpdate} onDelete={onDelete} />
      </Flex>
      <LoadModal isOpen={isOpen} onClose={onClose} onClick={onLoad} />
      {/* <ConfirmModal ruleName={currentCustomRule.name} isOpen={isOpenDelete} onClose={onDelete} /> */}
    </>
  )
}

export default BuilderPage
