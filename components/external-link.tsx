import React from 'react'
import { Link } from '@chakra-ui/react'

type Props = {
  href: string
  children: string | JSX.Element
}

const ExternalLink = (props: Props) => (
  <Link href={props.href} target="_blank" style={{ textDecoration: 'underline' }} mx="1">
    {props.children}
  </Link>
)

export default ExternalLink
