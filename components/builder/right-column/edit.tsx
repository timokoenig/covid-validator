import { ChevronLeftIcon } from '@chakra-ui/icons'
import { Box, Button, FormControl, Input, Spacer, Text, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'
import BuilderStateRuleDE from '../../../utils/builder-state-rules-de.json'
import { CustomRule } from '../../../utils/certlogic'
import ConfirmModal from '../../modal/confirm'

type Props = {
  customRule: CustomRule
  onChange: (customRule: CustomRule) => void
  onDelete: () => void
  onBack: () => void
}

const Edit = (props: Props) => {
  const { t } = useTranslation('common')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [name, setName] = useState<string>(props.customRule.name)
  const [description, setDescription] = useState<string>(props.customRule.description)
  const addMode = props.customRule.id === ''
  const isDirty = name !== props.customRule.name || description !== props.customRule.description

  useEffect(() => {
    setName(props.customRule.name)
    setDescription(props.customRule.description)
  }, [props.customRule])

  const onSave = () => {
    if (name === '') return
    props.onChange({
      ...props.customRule,
      name,
      description,
    })
  }

  const onDelete = (confirm: boolean) => {
    onClose()
    if (confirm) {
      props.onDelete()
    }
  }

  const onDuplicate = () => {
    props.onChange({
      ...props.customRule,
      id: uuidv4(),
      name: `${props.customRule.name} (${t('copy')})`,
    })
  }

  // TODO fix default BuilderStateRuleDE to match type definition
  const copyExisting = () => {
    props.onChange({
      ...BuilderStateRuleDE,
      id: uuidv4(),
      name: `${BuilderStateRuleDE.name} (${t('copy')})`,
    })
  }

  return (
    <>
      <Box flex="1" px="10" py="5" display="flex" flexDirection="column" overflow="scroll">
        <Box display="flex" flexDirection="row" mb="5">
          {!addMode && (
            <Button onClick={props.onBack}>
              <ChevronLeftIcon width="5" height="5" />
            </Button>
          )}
          <Spacer />
          {!addMode && (
            <>
              <Button variant="ghost" onClick={onDuplicate} mr="5">
                {t('duplicate')}
              </Button>
              <Button colorScheme="red" variant="ghost" onClick={onOpen} mr="5">
                {t('delete')}
              </Button>
            </>
          )}
          <Button colorScheme="blue" isDisabled={!isDirty} onClick={onSave}>
            {t('save')}
          </Button>
        </Box>
        <Box mb="10">
          <FormControl mb="5">
            <Input
              placeholder={t('builder.edit.name.placeholder')}
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <Input
              placeholder={t('builder.edit.description.placeholder')}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </FormControl>
        </Box>
        {addMode && (
          <Box my="10">
            <Text mb="5">
              (optional)
              <br />
              You can copy the existing custom rules for Hamburg, Germany by clicking the button
              below
            </Text>
            <Button onClick={copyExisting}>Hamburg, Germany</Button>
          </Box>
        )}
      </Box>
      <ConfirmModal
        title={t('builder.delete.confirm')}
        message={<Text>{t('builder.delete.confirm.message')}</Text>}
        isOpen={isOpen}
        onClose={onDelete}
      />
    </>
  )
}

export default Edit
