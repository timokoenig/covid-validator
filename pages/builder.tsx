import { Flex, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import LeftColumn from '../components/builder/left-column'
import ConfirmModal from '../components/builder/modal/confirm'
import LoadModal from '../components/builder/modal/load'
import RightColumn from '../components/builder/right-column'
import PageMeta from '../components/page-meta'
import { builder, setRules } from '../state/builder'

const BuilderPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()
  const toast = useToast()
  const builderState = builder.use()
  const [rule, setRule] = useState<string>('')
  const isNewRule = !builderState.rules.includes(rule)

  const onSave = () => {
    if (rule === '') return
    setRules([...builderState.rules.filter(r => r !== rule), rule])
    toast({
      title: 'Rules saved',
      status: 'success',
      duration: 3000,
    })
  }

  const onDelete = (confirm: boolean) => {
    onCloseDelete()
    if (!confirm) return
    setRules([...builderState.rules.filter(r => r !== rule)])
    setRule('')
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
        <RightColumn rules={[]} onChange={() => {}} />
      </Flex>
      <LoadModal isOpen={isOpen} onClose={onClose} />
      <ConfirmModal rule={rule} isOpen={isOpenDelete} onClose={onDelete} />
    </>
  )
}

export default BuilderPage
