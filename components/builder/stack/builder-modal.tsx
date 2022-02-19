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
  Select,
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
import {
  BType,
  BTypeCertificateType,
  BTypeCompare,
  BTypeCompareDate,
  BTypeDate,
  BTypeValue,
  BTypeVar,
  DURATION_DAYS,
  DURATION_HOURS,
  OPERATOR_DATE_NOT_AFTER,
  OPERATOR_DATE_NOT_BEFORE,
  OPERATOR_EQUALS,
  OPERATOR_GREATER,
  OPERATOR_GREATER_EQUALS,
} from '~/utils/builder/types'
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
        <Button onClick={() => props.onClick(value)}>Done</Button>
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

const DateBody = (props: {
  data?: BTypeDate
  onClose: () => void
  onClick: (value: string, number: number, duration: string) => void
  onDelete: () => void
}) => {
  const [value, setValue] = useState<string>(props.data ? (props.data.value.value as string) : '')
  const [valueNumber, setValueNumber] = useState<string>(
    props.data ? props.data.number.toString() : '0'
  )
  const [valueDuration, setValueDuration] = useState<string>(
    props.data ? props.data.duration : DURATION_HOURS
  )

  return (
    <ModalContent>
      <ModalHeader>Value</ModalHeader>
      <ModalCloseButton onClick={props.onClose} />
      <ModalBody>
        <Input value={value} placeholder="value" onChange={e => setValue(e.target.value)} />
        +
        <Input value={valueNumber} onChange={e => setValueNumber(e.target.value)} />
        <Select value={valueDuration} onChange={e => setValueDuration(e.target.value)}>
          <option value={DURATION_HOURS}>{DURATION_HOURS}</option>
          <option value={DURATION_DAYS}>{DURATION_DAYS}</option>
        </Select>
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
            props.onClick(value, parseInt(valueNumber, 10), valueDuration)
            props.onClose()
          }}
        >
          Done
        </Button>
      </ModalFooter>
    </ModalContent>
  )
}

const IfBody = (props: { onClose: () => void; onDelete: () => void }) => (
  <ModalContent>
    <ModalHeader>IF</ModalHeader>
    <ModalCloseButton onClick={props.onClose} />
    <ModalBody />
    <ModalFooter>
      <Button variant="ghost" colorScheme="red" onClick={props.onDelete}>
        Delete
      </Button>
      <Spacer />
    </ModalFooter>
  </ModalContent>
)

const AndBody = (props: { onClose: () => void; onDelete: () => void }) => (
  <ModalContent>
    <ModalHeader>AND</ModalHeader>
    <ModalCloseButton onClick={props.onClose} />
    <ModalBody />
    <ModalFooter>
      <Button variant="ghost" colorScheme="red" onClick={props.onDelete}>
        Delete
      </Button>
      <Spacer />
    </ModalFooter>
  </ModalContent>
)

const CompareBody = (props: {
  data?: BTypeCompare
  onClose: () => void
  onClick: (selection: string) => void
  onDelete: () => void
}) => {
  const [value, setValue] = useState<string>(props.data ? props.data.operator : OPERATOR_EQUALS)

  return (
    <ModalContent>
      <ModalHeader>Compare</ModalHeader>
      <ModalCloseButton onClick={props.onClose} />
      <ModalBody>
        <Select value={value} onChange={e => setValue(e.target.value)}>
          <option value={OPERATOR_EQUALS}>{OPERATOR_EQUALS}</option>
          <option value={OPERATOR_GREATER}>{OPERATOR_GREATER}</option>
          <option value={OPERATOR_GREATER_EQUALS}>{OPERATOR_GREATER_EQUALS}</option>
        </Select>
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

const CompareDateBody = (props: {
  data?: BTypeCompareDate
  onClose: () => void
  onClick: (selection: string) => void
  onDelete: () => void
}) => {
  const [value, setValue] = useState<string>(
    props.data ? props.data.operator : OPERATOR_DATE_NOT_AFTER
  )

  return (
    <ModalContent>
      <ModalHeader>Compare Date</ModalHeader>
      <ModalCloseButton onClick={props.onClose} />
      <ModalBody>
        <Select value={value} onChange={e => setValue(e.target.value)}>
          <option value={OPERATOR_DATE_NOT_AFTER}>{OPERATOR_DATE_NOT_AFTER}</option>
          <option value={OPERATOR_DATE_NOT_BEFORE}>{OPERATOR_DATE_NOT_BEFORE}</option>
        </Select>
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
    if (props.data instanceof BClassCertificateType) {
      setType('Certificate Type')
      return
    }
    if (props.data instanceof BClassValue) {
      setType('Value')
      return
    }
    if (props.data instanceof BClassVar) {
      setType('Var')
      return
    }
    if (props.data instanceof BClassDate) {
      setType('Date')
      return
    }
    if (props.data instanceof BClassIf) {
      setType('IF')
      return
    }
    if (props.data instanceof BClassAnd) {
      setType('AND')
      return
    }
    if (props.data instanceof BClassCompare) {
      setType('Compare')
      return
    }
    if (props.data instanceof BClassCompareDate) {
      setType('Compare Date')
      return
    }
    setType('')
  }, [])

  const onClose = () => {
    setType('')
    props.onClose()
  }

  return (
    <Modal isOpen={props.isOpen} onClose={onClose} size="lg" scrollBehavior="inside">
      <ModalOverlay />
      {type === '' && (
        <SelectionBody
          onClose={onClose}
          onClick={(selection: string) => {
            switch (selection) {
              case 'Certificate Type':
              case 'Vaccination Status':
              case 'Value':
              case 'Var':
              case 'Date':
                setType(selection)
                break
              case 'Compare':
                props.onClick(new BClassCompare())
                onClose()
                break
              case 'Compare Date':
                props.onClick(new BClassCompareDate())
                onClose()
                break
              case 'Compare In':
                props.onClick(new BClassCompareIn())
                onClose()
                break
              case 'IF':
                props.onClick(new BClassIf())
                onClose()
                break
              case 'AND':
                props.onClick(new BClassAnd())
                onClose()
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
          onClose={onClose}
          onClick={(selection: string) => {
            if (props.data === undefined) {
              props.onClick(new BClassCertificateType(selection))
              onClose()
              return
            }
            const bType = props.data as BTypeCertificateType
            bType.type = selection
            props.onClick(bType)
            onClose()
          }}
          onDelete={() => {
            props.onClick(new BClassEmpty())
            onClose()
          }}
        />
      )}
      {type === 'Value' && (
        <ValueBody
          data={props.data as BTypeValue}
          onClose={onClose}
          onClick={(value: string) => {
            props.onClick(new BClassValue(value))
            onClose()
          }}
          onDelete={() => {
            props.onClick(new BClassEmpty())
            onClose()
          }}
        />
      )}
      {type === 'Var' && (
        <VarBody
          data={props.data as BTypeVar}
          onClose={onClose}
          onClick={(value: string) => {
            props.onClick(new BClassVar(value))
            onClose()
          }}
          onDelete={() => {
            props.onClick(new BClassEmpty())
            onClose()
          }}
        />
      )}
      {type === 'Date' && (
        <DateBody
          data={props.data as BTypeDate}
          onClose={onClose}
          onClick={(value: string, number: number, duration: string) => {
            props.onClick(new BClassDate(new BClassValue(value), number, duration))
            onClose()
          }}
          onDelete={() => {
            props.onClick(new BClassEmpty())
            onClose()
          }}
        />
      )}
      {type === 'Compare' && (
        <CompareBody
          data={props.data as BTypeCompare}
          onClose={onClose}
          onClick={(selection: string) => {
            if (props.data === undefined) {
              props.onClick(new BClassCompare(new BClassEmpty(), new BClassEmpty(), selection))
              onClose()
              return
            }
            const bType = props.data as BTypeCompare
            bType.operator = selection
            props.onClick(bType)
            onClose()
          }}
          onDelete={() => {
            props.onClick(new BClassEmpty())
            onClose()
          }}
        />
      )}
      {type === 'Compare Date' && (
        <CompareDateBody
          data={props.data as BTypeCompareDate}
          onClose={onClose}
          onClick={(selection: string) => {
            if (props.data === undefined) {
              props.onClick(new BClassCompareDate(new BClassEmpty(), new BClassEmpty(), selection))
              onClose()
              return
            }
            const bType = props.data as BTypeCompareDate
            bType.operator = selection
            props.onClick(bType)
            onClose()
          }}
          onDelete={() => {
            props.onClick(new BClassEmpty())
            onClose()
          }}
        />
      )}
      {type === 'IF' && (
        <IfBody
          onClose={onClose}
          onDelete={() => {
            props.onClick(new BClassEmpty())
            onClose()
          }}
        />
      )}
      {type === 'AND' && (
        <AndBody
          onClose={onClose}
          onDelete={() => {
            props.onClick(new BClassEmpty())
            onClose()
          }}
        />
      )}
    </Modal>
  )
}

export default BuilderModal
