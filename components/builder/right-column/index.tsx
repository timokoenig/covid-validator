import React, { useEffect, useState } from 'react'
import { CertificateRule, CustomRule } from '../../../utils/certlogic'
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
  const [editModeImmunizationRules, setEditModeImmunizationRules] = useState<boolean>(false)

  useEffect(() => {
    setEditMode(false)
    setEditModeCertificateRule(null)
    setEditModeImmunizationRules(false)
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
  if (editModeImmunizationRules) {
    return (
      <EditImmunizationRules
        customRule={props.customRule}
        onChange={props.onChange}
        onBack={() => setEditModeImmunizationRules(false)}
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
      onEditImmunizationRules={() => setEditModeImmunizationRules(true)}
    />
  )
}

export default RightColumn
