import { Flex, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import LeftColumn from '../components/builder/left-column'
import LoadModal from '../components/builder/modal/load'
import RightColumn from '../components/builder/right-column'
import PageMeta from '../components/page-meta'
import { builder, setRules } from '../state/builder'

const BuilderPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const builderState = builder.use()
  const [rule, setRule] = useState<string>('')

  const onSave = () => {
    if (rule === '') return
    setRules([...builderState.rules.filter(r => r !== rule), rule])
    toast({
      title: 'Rules saved',
      status: 'success',
      duration: 3000,
    })
  }

  return (
    <>
      <PageMeta allowIndex={false} />
      <Flex color="white" height="100vh">
        <LeftColumn rule={rule} onLoad={onOpen} onSave={onSave} onChange={setRule} />
        <RightColumn rules={[]} onChange={() => {}} />
      </Flex>
      <LoadModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default BuilderPage
