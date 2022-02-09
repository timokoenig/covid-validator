import React from 'react'

type Props = {
  country: string
  size: number
}

const Flag = (props: Props) => (
  <span
    className={`fi fi-${props.country} fis`}
    style={{ width: props.size, height: props.size, borderRadius: props.size / 2 }}
  />
)

export default Flag
