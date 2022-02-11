import { Flex, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import LeftColumn from '../components/builder/left-column'
import LoadModal from '../components/builder/modal/load'
import RightColumn from '../components/builder/right-column'
import PageMeta from '../components/page-meta'
import { builder, setRules } from '../state/builder'

const BuilderPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const builderState = builder.use()
  const [rule, setRule] = useState<string>('')

  const onSave = () => {
    if (rule === '') return
    setRules([...builderState.rules.filter(r => r !== rule), rule])
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
