import React from 'react'
import tw, { TwStyle } from 'twin.macro'

interface InputProps {
  hasHover: boolean
}

const stylesInput = ({ hasHover }: InputProps): TwStyle[] => [
  tw`border`, // Add base styles first
  hasHover && tw`hover:border-black`, // Then conditional styles
]

const Input = (props: InputProps): React.ReactElement => <input css={stylesInput(props)} />

export default Input
