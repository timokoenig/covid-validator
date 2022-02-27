import { Box } from '@chakra-ui/react'
import React, { CSSProperties } from 'react'
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
import { BType } from '../../../../utils/builder/types'
import BComponentAnd from './and'
import BComponentCertificateType from './certificate-type'
import BComponentCompare from './compare'
import BComponentCompareDate from './compare-date'
import BComponentCompareIn from './compare-in'
import BComponentDate from './date'
import BComponentEmpty from './empty'
import BComponentIf from './if'
import BComponentImmunizationStatus from './immunization-status'
import BComponentValue from './value'
import BComponentVar from './var'

export type BComponentProps<T> = {
  data: T
  styles?: CSSProperties
  depth: number
  onChange: (data: T) => void
}

export const BComponent = (props: BComponentProps<BType>) => {
  if (props.data instanceof BClassIf) {
    return (
      <BComponentIf
        data={props.data}
        styles={props.styles}
        depth={props.depth + 1}
        onChange={props.onChange}
      />
    )
  }
  if (props.data instanceof BClassValue) {
    return (
      <BComponentValue
        data={props.data}
        styles={props.styles}
        depth={props.depth + 1}
        onChange={props.onChange}
      />
    )
  }
  if (props.data instanceof BClassVar) {
    return (
      <BComponentVar
        data={props.data}
        styles={props.styles}
        depth={props.depth + 1}
        onChange={props.onChange}
      />
    )
  }
  if (props.data instanceof BClassCertificateType) {
    return (
      <BComponentCertificateType
        data={props.data}
        styles={props.styles}
        depth={props.depth + 1}
        onChange={props.onChange}
      />
    )
  }
  if (props.data instanceof BClassImmunizationStatus) {
    return (
      <BComponentImmunizationStatus
        data={props.data}
        styles={props.styles}
        depth={props.depth + 1}
        onChange={props.onChange}
      />
    )
  }
  if (props.data instanceof BClassDate) {
    return (
      <BComponentDate
        data={props.data}
        styles={props.styles}
        depth={props.depth + 1}
        onChange={props.onChange}
      />
    )
  }
  if (props.data instanceof BClassCompare) {
    return (
      <BComponentCompare
        data={props.data}
        styles={props.styles}
        depth={props.depth + 1}
        onChange={props.onChange}
      />
    )
  }
  if (props.data instanceof BClassCompareDate) {
    return (
      <BComponentCompareDate
        data={props.data}
        styles={props.styles}
        depth={props.depth + 1}
        onChange={props.onChange}
      />
    )
  }
  if (props.data instanceof BClassCompareIn) {
    return (
      <BComponentCompareIn
        data={props.data}
        styles={props.styles}
        depth={props.depth + 1}
        onChange={props.onChange}
      />
    )
  }
  if (props.data instanceof BClassAnd) {
    return (
      <BComponentAnd
        data={props.data}
        styles={props.styles}
        depth={props.depth + 1}
        onChange={props.onChange}
      />
    )
  }
  if (props.data instanceof BClassEmpty) {
    return <BComponentEmpty data={props.data} depth={props.depth + 1} onChange={props.onChange} />
  }
  return <Box />
}
