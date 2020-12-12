import React from 'react'
import tw, { styled } from 'twin.macro'

const StyledInput = styled.input(() => [`color: purple;`, tw`border rounded hover:border-black`])

const Input = (): React.ReactElement => <StyledInput />

export default Input
