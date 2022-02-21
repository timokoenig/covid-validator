/* eslint-disable react-hooks/exhaustive-deps */
import { Modal, ModalOverlay } from '@chakra-ui/react'
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
} from '../../../../utils/builder/classes'
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
  Value,
} from '../../../../utils/builder/types'
import { ImmunizationRule } from '../../../../utils/certlogic'
import AndBody from './and'
import CertificateTypeBody from './certificate-type'
import CompareBody from './compare'
import CompareDateBody from './compare-date'
import CompareInBody from './compare-in'
import DateBody from './date'
import IfBody from './if'
import ImmunizationStatusBody from './immunization-status'
import SelectionBody from './selection'
import {
  MODAL_TYPE_AND,
  MODAL_TYPE_CERTIFICATE_TYPE,
  MODAL_TYPE_COMPARE,
  MODAL_TYPE_COMPARE_DATE,
  MODAL_TYPE_COMPARE_IN,
  MODAL_TYPE_DATE,
  MODAL_TYPE_IF,
  MODAL_TYPE_IMMUNIZATION_STATUS,
  MODAL_TYPE_VALUE,
  MODAL_TYPE_VAR,
} from './types'
import ValueBody from './value'
import VarBody from './var'

type Props = {
  data?: BType
  immunizationRules?: ImmunizationRule[]
  isOpen: boolean
  onClose: () => void
  onClick: (type: BType) => void
}

const BuilderModal = (props: Props) => {
  const [type, setType] = useState<string>('')

  useEffect(() => {
    if (props.data instanceof BClassCertificateType) {
      setType(MODAL_TYPE_CERTIFICATE_TYPE)
      return
    }
    if (props.data instanceof BClassImmunizationStatus) {
      setType(MODAL_TYPE_IMMUNIZATION_STATUS)
      return
    }
    if (props.data instanceof BClassValue) {
      setType(MODAL_TYPE_VALUE)
      return
    }
    if (props.data instanceof BClassVar) {
      setType(MODAL_TYPE_VAR)
      return
    }
    if (props.data instanceof BClassDate) {
      setType(MODAL_TYPE_DATE)
      return
    }
    if (props.data instanceof BClassIf) {
      setType(MODAL_TYPE_IF)
      return
    }
    if (props.data instanceof BClassAnd) {
      setType(MODAL_TYPE_AND)
      return
    }
    if (props.data instanceof BClassCompare) {
      setType(MODAL_TYPE_COMPARE)
      return
    }
    if (props.data instanceof BClassCompareDate) {
      setType(MODAL_TYPE_COMPARE_DATE)
      return
    }
    if (props.data instanceof BClassCompareIn) {
      setType(MODAL_TYPE_COMPARE_IN)
      return
    }
    setType('')
  }, [props.isOpen])

  const onClose = () => {
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
              case MODAL_TYPE_CERTIFICATE_TYPE:
              case MODAL_TYPE_IMMUNIZATION_STATUS:
              case MODAL_TYPE_VALUE:
              case MODAL_TYPE_VAR:
              case MODAL_TYPE_DATE:
              case MODAL_TYPE_COMPARE_IN:
                setType(selection)
                break
              case MODAL_TYPE_COMPARE:
                props.onClick(new BClassCompare())
                onClose()
                break
              case MODAL_TYPE_COMPARE_DATE:
                props.onClick(new BClassCompareDate())
                onClose()
                break
              case MODAL_TYPE_IF:
                props.onClick(new BClassIf())
                onClose()
                break
              case MODAL_TYPE_AND:
                props.onClick(new BClassAnd())
                onClose()
                break
              default:
                break
            }
          }}
        />
      )}
      {type === MODAL_TYPE_CERTIFICATE_TYPE && (
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
      {type === MODAL_TYPE_IMMUNIZATION_STATUS && (
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
      {type === MODAL_TYPE_VALUE && (
        <ValueBody
          data={props.data as BTypeValue}
          onClose={onClose}
          onClick={(value: Value) => {
            props.onClick(new BClassValue(value))
            onClose()
          }}
          onDelete={() => {
            props.onClick(new BClassEmpty())
            onClose()
          }}
        />
      )}
      {type === MODAL_TYPE_VAR && (
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
      {type === MODAL_TYPE_DATE && (
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
      {type === MODAL_TYPE_COMPARE && (
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
      {type === MODAL_TYPE_COMPARE_DATE && (
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
      {type === MODAL_TYPE_COMPARE_IN && (
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
      {type === MODAL_TYPE_IF && (
        <IfBody
          onClose={onClose}
          onDelete={() => {
            props.onClick(new BClassEmpty())
            onClose()
          }}
        />
      )}
      {type === MODAL_TYPE_AND && (
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
