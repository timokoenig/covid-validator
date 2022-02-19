/* eslint-disable react-hooks/exhaustive-deps */
import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  Button,
  Heading,
  Input,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {
  BClassAnd,
  BClassCertificateType,
  BClassCompare,
  BClassCompareDate,
  BClassCompareIn,
  BClassDate,
  BClassEmpty,
  BClassIf,
  BClassValue,
  BClassVar,
} from '~/utils/builder/classes'
import { BType, BTypeCertificateType, BTypeValue, BTypeVar } from '~/utils/builder/types'
// import { useTranslation } from 'react-i18next'

const customTypes = ['Certificate Type', 'Vaccination Status']
const types = ['Value', 'Var', 'Date', 'Compare', 'Compare Date', 'Compare In', 'IF', 'AND']
const certificateTypes = ['Vaccination', 'Test', 'Recovery']

const ValueBody = (props: {
  data?: BTypeValue
  onClose: () => void
  onClick: (value: string) => void
  onDelete: () => void
}) => {
  const [value, setValue] = useState<string>(props.data ? (props.data.value as string) : '')

  return (
    <ModalContent>
      <ModalHeader>Value</ModalHeader>
      <ModalCloseButton onClick={props.onClose} />
      <ModalBody>
        <Input value={value} onChange={e => setValue(e.target.value)} />
      </ModalBody>
      <ModalFooter>
        {props.data && (
          <Button variant="ghost" colorScheme="red" onClick={props.onDelete}>
            Delete
          </Button>
        )}
        <Spacer />
        <Button
          onClick={() => {
            props.onClick(value)
            props.onClose()
          }}
        >
          Done
        </Button>
      </ModalFooter>
    </ModalContent>
  )
}

const VarBody = (props: {
  data?: BTypeVar
  onClose: () => void
  onClick: (value: string) => void
  onDelete: () => void
}) => {
  const [value, setValue] = useState<string>(props.data ? (props.data.value as string) : '')

  return (
    <ModalContent>
      <ModalHeader>Variable</ModalHeader>
      <ModalCloseButton onClick={props.onClose} />
      <ModalBody>
        <Input value={value} onChange={e => setValue(e.target.value)} />
      </ModalBody>
      <ModalFooter>
        {props.data && (
          <Button variant="ghost" colorScheme="red" onClick={props.onDelete}>
            Delete
          </Button>
        )}
        <Spacer />
        <Button
          onClick={() => {
            props.onClick(value)
            props.onClose()
          }}
        >
          Done
        </Button>
      </ModalFooter>
    </ModalContent>
  )
}

const CertificateTypeBody = (props: {
  editMode: boolean
  onClose: () => void
  onClick: (selection: string) => void
  onDelete: () => void
}) => (
  <ModalContent>
    <ModalHeader>Certificate Type</ModalHeader>
    <ModalCloseButton onClick={props.onClose} />
    <ModalBody>
      <List>
        {certificateTypes.map(type => (
          <ListItem key={type} display="flex">
            <Button
              variant="ghost"
              flex="1"
              justifyContent="left"
              onClick={() => props.onClick(type)}
            >
              {type}
              <Spacer />
              <ChevronRightIcon width="5" height="5" />
            </Button>
          </ListItem>
        ))}
      </List>
    </ModalBody>
    <ModalFooter>
      {props.editMode && (
        <Button variant="ghost" colorScheme="red" onClick={props.onDelete}>
          Delete
        </Button>
      )}
      <Spacer />
    </ModalFooter>
  </ModalContent>
)

const SelectionBody = (props: { onClose: () => void; onClick: (selection: string) => void }) => (
  <ModalContent>
    <ModalHeader>Select Component</ModalHeader>
    <ModalCloseButton onClick={props.onClose} />
    <ModalBody>
      <Heading size="md">Custom</Heading>
      <List mb="5">
        {customTypes.map(type => (
          <ListItem key={type} display="flex">
            <Button
              variant="ghost"
              flex="1"
              justifyContent="left"
              onClick={() => props.onClick(type)}
            >
              {type}
              <Spacer />
              <ChevronRightIcon width="5" height="5" />
            </Button>
          </ListItem>
        ))}
      </List>
      <Heading size="md">Default</Heading>
      <List>
        {types.map(type => (
          <ListItem key={type} display="flex">
            <Button
              variant="ghost"
              flex="1"
              justifyContent="left"
              onClick={() => props.onClick(type)}
            >
              {type}
              <Spacer />
              <ChevronRightIcon width="5" height="5" />
            </Button>
          </ListItem>
        ))}
      </List>
    </ModalBody>
    <ModalFooter />
  </ModalContent>
)

type Props = {
  data?: BType
  isOpen: boolean
  onClose: () => void
  onClick: (type: BType) => void
}

const BuilderModal = (props: Props) => {
  // const { t } = useTranslation('common')
  const [type, setType] = useState<string>('')

  useEffect(() => {
    if (props.data === undefined) {
      setType('')
      return
    }
    if (props.data instanceof BClassCertificateType) {
      setType('Certificate Type')
    }
    if (props.data instanceof BClassValue) {
      setType('Value')
    }
    if (props.data instanceof BClassVar) {
      setType('Var')
    }
  }, [])

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="lg" scrollBehavior="inside">
      <ModalOverlay />
      {type === '' && (
        <SelectionBody
          onClose={props.onClose}
          onClick={(selection: string) => {
            switch (selection) {
              case 'Certificate Type':
              case 'Vaccination Status':
              case 'Value':
              case 'Var':
                setType(selection)
                break
              case 'Date':
                props.onClick(new BClassDate())
                break
              case 'Compare':
                props.onClick(new BClassCompare())
                break
              case 'Compare Date':
                props.onClick(new BClassCompareDate())
                break
              case 'Compare In':
                props.onClick(new BClassCompareIn())
                break
              case 'IF':
                props.onClick(new BClassIf())
                break
              case 'AND':
                props.onClick(new BClassAnd())
                break
              default:
                break
            }
          }}
        />
      )}
      {type === 'Certificate Type' && (
        <CertificateTypeBody
          editMode={props.data !== undefined}
          onClose={props.onClose}
          onClick={(selection: string) => {
            if (props.data === undefined) {
              props.onClick(new BClassCertificateType(selection))
              return
            }
            const bType = props.data as BTypeCertificateType
            bType.type = selection
            props.onClick(bType)
          }}
          onDelete={() => {
            props.onClick(new BClassEmpty())
          }}
        />
      )}
      {type === 'Value' && (
        <ValueBody
          data={props.data as BTypeValue}
          onClose={props.onClose}
          onClick={(value: string) => {
            props.onClick(new BClassValue(value))
          }}
          onDelete={() => {
            props.onClick(new BClassEmpty())
          }}
        />
      )}
      {type === 'Var' && (
        <VarBody
          data={props.data as BTypeVar}
          onClose={props.onClose}
          onClick={(value: string) => {
            props.onClick(new BClassVar(value))
          }}
          onDelete={() => {
            props.onClick(new BClassEmpty())
          }}
        />
      )}
    </Modal>
  )
}

export default BuilderModal
