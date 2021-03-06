import { Stack } from '@chakra-ui/react'
import React from 'react'
import { BClassEmpty, encode } from '../../../utils/builder/classes'
import { BType, JSONObject } from '../../../utils/builder/types'
import { BComponent } from './component'

type Props = {
  data: JSONObject | null
  onChange: (data: JSONObject | null) => void
}

const BuilderStack = (props: Props) => {
  const encodedData = encode(props.data)
  const onChange = (data: BType) => {
    if (data instanceof BClassEmpty) {
      props.onChange(null)
      return
    }
    const decodedData = data.decode() as JSONObject
    props.onChange(decodedData)
  }

  return (
    <Stack borderRadius="10">
      <BComponent data={encodedData} onChange={onChange} depth={1} />
    </Stack>
  )
}

export default BuilderStack
