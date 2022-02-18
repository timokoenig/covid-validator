import { Stack } from '@chakra-ui/react'
import React from 'react'
import { encode } from '../../../utils/builder/classes'
import { BType, JSONObject } from '../../../utils/builder/types'
import { BComponent } from './component'

type Props = {
  data: JSONObject
  onChange: (data: JSONObject) => void
}

const BuilderStack = (props: Props) => {
  const encodedData = encode(props.data)
  const onChange = (data: BType) => {
    const decodedData = data.decode() as JSONObject
    props.onChange(decodedData)
  }

  return (
    <Stack borderRadius="10" overflow="hidden">
      <BComponent data={encodedData} onChange={onChange} depth={1} />
    </Stack>
  )
}

export default BuilderStack
