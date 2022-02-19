/* eslint-disable react-hooks/exhaustive-deps */
import { ChevronRightIcon, DeleteIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Checkbox,
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
  BClassImmunizationStatus,
  BClassValue,
  BClassVar,
} from '~/utils/builder/classes'
import {
  BType,
  BTypeCertificateType,
  BTypeCompare,
  BTypeCompareDate,
  BTypeCompareIn,
  BTypeDate,
  BTypeImmunizationStatus,
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
import vaccines from '~/utils/vaccines'
// import { useTranslation } from 'react-i18next'

const customTypes = ['Certificate Type', 'Immunization Status']
const types = ['Value', 'Var', 'Date', 'Compare', 'Compare Date', 'Compare In', 'IF', 'AND']
const certificateTypes = ['Vaccination', 'Test', 'Recovery']
const immunizationStatus = ['partial', 'full', 'full-recovery', 'booster']

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

const CompareInBody = (props: {
  data?: BTypeCompareIn
  onClose: () => void
  onClick: (values: string[]) => void
  onDelete: () => void
}) => {
  const [values, setValues] = useState<string[]>(props.data ? props.data.values : [''])

  return (
    <ModalContent>
      <ModalHeader>Compare In</ModalHeader>
      <ModalCloseButton onClick={props.onClose} />
      <ModalBody>
        {values.map((v, index) => (
          <Box key={index} display="flex" flexDirection="row" mb="2">
            <Input
              value={v}
              onChange={e => {
                const tmp = [...values]
                tmp[index] = e.target.value
                setValues(tmp)
              }}
              mr="2"
            />
            <Button
              colorScheme="red"
              onClick={() => {
                const tmp = [...values]
                tmp.splice(index, 1)
                setValues(tmp)
              }}
            >
              <DeleteIcon width="5" height="5" />
            </Button>
          </Box>
        ))}
        <Button
          isFullWidth
          onClick={() => {
            if (values.length > 0 && values[values.length - 1] === '') return
            setValues([...values, ''])
          }}
        >
          Add Item
        </Button>
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
            props.onClick(values.filter(v => v !== ''))
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

const ImmunizationStatusBody = (props: {
  editMode: boolean
  onClose: () => void
  onClick: (status: string, vaccines: string[]) => void
  onDelete: () => void
}) => {
  const [status, setStatus] = useState<string>('')
  const [selectedVaccines, setSelectedVaccines] = useState<string[]>([])
  return (
    <ModalContent>
      <ModalHeader>Immunization Status</ModalHeader>
      <ModalCloseButton onClick={props.onClose} />
      <ModalBody>
        {status === '' ? (
          <List>
            {immunizationStatus.map(item => (
              <ListItem key={item} display="flex">
                <Button
                  variant="ghost"
                  flex="1"
                  justifyContent="left"
                  onClick={() => setStatus(item)}
                >
                  {item}
                  <Spacer />
                  <ChevronRightIcon width="5" height="5" />
                </Button>
              </ListItem>
            ))}
          </List>
        ) : (
          <List>
            {vaccines.map(item => (
              <ListItem key={item.id} display="flex">
                <Button
                  isFullWidth
                  h="auto"
                  position="relative"
                  overflowWrap="anywhere"
                  whiteSpace="normal"
                  variant="ghost"
                  justifyContent="left"
                  p="0"
                >
                  <Checkbox
                    isChecked={selectedVaccines.includes(item.id)}
                    w="100%"
                    h="100%"
                    p="4"
                    wordBreak="break-all"
                    onChange={e =>
                      e.target.checked
                        ? setSelectedVaccines([...selectedVaccines, item.id])
                        : setSelectedVaccines(selectedVaccines.filter(v => v !== item.id))
                    }
                  >
                    {item.name}
                  </Checkbox>
                </Button>
              </ListItem>
            ))}
          </List>
        )}
      </ModalBody>
      <ModalFooter>
        {props.editMode && (
          <Button variant="ghost" colorScheme="red" onClick={props.onDelete}>
            Delete
          </Button>
        )}
        <Spacer />
        {status !== '' && (
          <Button onClick={() => props.onClick(status, selectedVaccines)}>Done</Button>
        )}
      </ModalFooter>
    </ModalContent>
  )
}

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
    if (props.data instanceof BClassImmunizationStatus) {
      setType('Immunization Status')
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
    if (props.data instanceof BClassCompareIn) {
      setType('Compare In')
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
              case 'Immunization Status':
              case 'Value':
              case 'Var':
              case 'Date':
              case 'Compare In':
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
      {type === 'Immunization Status' && (
        <ImmunizationStatusBody
          editMode={props.data !== undefined}
          onClose={onClose}
          onClick={(status: string, selectedVaccines: string[]) => {
            if (props.data === undefined) {
              props.onClick(new BClassImmunizationStatus(status, selectedVaccines))
              onClose()
              return
            }
            const bType = props.data as BTypeImmunizationStatus
            bType.status = status
            bType.vaccines = selectedVaccines
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
      {type === 'Compare In' && (
        <CompareInBody
          data={props.data as BTypeCompareIn}
          onClose={onClose}
          onClick={(values: string[]) => {
            if (props.data === undefined) {
              props.onClick(new BClassCompareIn(new BClassEmpty(), values))
              onClose()
              return
            }
            const bType = props.data as BTypeCompareIn
            bType.values = values
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
