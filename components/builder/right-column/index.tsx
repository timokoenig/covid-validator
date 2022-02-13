import React, { useEffect, useState } from 'react'
import { CustomRule } from '../../../utils/certlogic'
import Edit from './edit'
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
  const [editModeImmunizationRules, setEditModeImmunizationRules] = useState<boolean>(false)

  useEffect(() => {
    setEditMode(false)
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
  return (
    <Overview
      customRule={props.customRule}
      onChange={props.onChange}
      onEdit={() => setEditMode(true)}
      onEditImmunizationRules={() => setEditModeImmunizationRules(true)}
    />
  )
}

export default RightColumn
