import React, { useEffect, useState } from 'react'
import { CertificateRule, CustomRule, ImmunizationRule } from '../../../utils/certlogic'
import Edit from './edit'
import EditCertificateRule from './edit-certificate-rule'
import EditImmunizationRules from './edit-immunization-rules'
import Empty from './empty'
import Overview from './overview'

type Props = {
  customRule: CustomRule | null
  onChange: (customRule: CustomRule) => void
  onDelete: () => void
}

const RightColumn = (props: Props) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [editModeCertificateRule, setEditModeCertificateRule] = useState<CertificateRule | null>(
    null
  )
  const [editModeImmunizationRule, setEditModeImmunizationRule] = useState<ImmunizationRule | null>(
    null
  )

  useEffect(() => {
    setEditMode(false)
    setEditModeCertificateRule(null)
    setEditModeImmunizationRule(null)
  }, [props.customRule])

  if (props.customRule === null) {
    return <Empty />
  }
  if (props.customRule.id === '' || editMode) {
    return (
      <Edit
        customRule={props.customRule}
        onChange={props.onChange}
        onDelete={props.onDelete}
        onBack={() => setEditMode(false)}
      />
    )
  }
  if (editModeImmunizationRule !== null) {
    return (
      <EditImmunizationRules
        customRule={props.customRule}
        immunizationRule={editModeImmunizationRule}
        onChange={props.onChange}
        onBack={() => setEditModeImmunizationRule(null)}
      />
    )
  }
  if (editModeCertificateRule !== null) {
    return (
      <EditCertificateRule
        customRule={props.customRule}
        certificateRule={editModeCertificateRule}
        onChange={props.onChange}
        onBack={() => setEditModeCertificateRule(null)}
      />
    )
  }
  return (
    <Overview
      customRule={props.customRule}
      onChange={props.onChange}
      onEdit={() => setEditMode(true)}
      onEditCertificateRule={setEditModeCertificateRule}
      onEditImmunizationRule={setEditModeImmunizationRule}
    />
  )
}

export default RightColumn
