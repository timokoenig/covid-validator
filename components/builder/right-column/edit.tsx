import { ChevronLeftIcon, DeleteIcon } from '@chakra-ui/icons'
import { Box, Button, FormControl, Input, Spacer, Text, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { CustomRule } from '../../../utils/certlogic'
import ConfirmModal from '../../modal/confirm'

type Props = {
  customRule: CustomRule
  onChange: (customRule: CustomRule) => void
  onDelete: () => void
  onBack: () => void
}

const Edit = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [name, setName] = useState<string>(props.customRule.name)
  const [description, setDescription] = useState<string>(props.customRule.description)
  const addMode = props.customRule.id === ''
  const isDirty = name !== props.customRule.name || description !== props.customRule.description
  // const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    setName(props.customRule.name)
    setDescription(props.customRule.description)
  }, [props.customRule])

  // const onAdd = () => {
  //   props.onChange({
  //     ...props.customRule,
  //     rules: [
  //       ...props.customRule.rules,
  //       {
  //         Identifier: uuidv4(),
  //         Type: 'Acceptance',
  //         Country: 'DE',
  //         Version: '1.0.0',
  //         SchemaVersion: '1.0.0',
  //         Engine: 'CERTLOGIC',
  //         EngineVersion: '0.7.5',
  //         CertificateType: 'Vaccination',
  //         Description: [],
  //         ValidFrom: '',
  //         ValidTo: '',
  //         AffectedFields: [],
  //         Logic: null,
  //       },
  //     ],
  //   })
  // }

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
            <Button colorScheme="red" onClick={onOpen} mr="5">
              <DeleteIcon width="3" height="3" />
            </Button>
          )}
          <Button colorScheme="blue" isDisabled={!isDirty} onClick={onSave}>
            Save
          </Button>
        </Box>
        <Box mb="10">
          <FormControl mb="5">
            <Input
              placeholder="Name (required)"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <Input
              placeholder="Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </FormControl>
        </Box>
      </Box>
      <ConfirmModal
        title="Are you sure?"
        message={
          <Text>
            The custom rule
            <Text as="span" fontWeight="semibold" mx="1">
              {name}
            </Text>
            will be deleted irrevocably from your device. It will not be delete from other devices.
          </Text>
        }
        isOpen={isOpen}
        onClose={onDelete}
      />
    </>
  )
}

export default Edit
