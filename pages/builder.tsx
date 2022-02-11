import { Flex, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import LeftColumn from '../components/builder/left-column'
import ConfirmModal from '../components/builder/modal/confirm'
import LoadModal from '../components/builder/modal/load'
import RightColumn from '../components/builder/right-column'
import PageMeta from '../components/page-meta'
import { builder, setRules } from '../state/builder'
import { CustomRules } from '../utils/certlogic'

const BuilderPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()
  const toast = useToast()
  const builderState = builder.use()
  const [rule, setRule] = useState<CustomRules>({
    id: '',
    name: '',
    description: '',
    rules: [],
  })
  const isNewRule = builderState.rules.find(r => r.id == rule.id) === undefined

  const onLoad = (item: CustomRules) => {
    setRule(item)
    onClose()
  }

  const onSave = () => {
    if (rule.name === '') return
    const savedRule = { ...rule, id: rule.id === '' ? uuidv4() : rule.id }
    setRules([...builderState.rules.filter(r => r.id !== rule.id), savedRule])
    setRule(savedRule)
    toast({
      title: 'Rules saved',
      status: 'success',
      duration: 3000,
    })
  }

  const onUpdate = (rules: CustomRules) => {
    const updatedRule = { ...rules, id: rules.id === '' ? uuidv4() : rule.id }
    setRules([...builderState.rules.filter(r => r.id !== rule.id), updatedRule])
    setRule(updatedRule)
    toast({
      title: 'Rules updated',
      status: 'success',
      duration: 3000,
    })
  }

  const onDelete = (confirm: boolean) => {
    onCloseDelete()
    if (!confirm) return
    setRules([...builderState.rules.filter(r => r !== rule)])
    setRule({ id: '', name: '', description: '', rules: [] })
    toast({
      title: 'Rule deleted',
      status: 'success',
      duration: 3000,
    })
  }

  return (
    <>
      <PageMeta allowIndex={false} />
      <Flex color="white" height="100vh">
        <LeftColumn
          rule={rule}
          isNewRule={isNewRule}
          onLoad={onOpen}
          onSave={onSave}
          onChange={setRule}
          onDelete={onOpenDelete}
        />
        <RightColumn rules={rule} onChange={onUpdate} />
      </Flex>
      <LoadModal isOpen={isOpen} onClose={onClose} onClick={onLoad} />
      <ConfirmModal rule={rule.name} isOpen={isOpenDelete} onClose={onDelete} />
    </>
  )
}

export default BuilderPage
