import React from 'react'
import { Button as RKButton, ButtonProps } from 'reakit/Button'

export const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <RKButton {...rest} className="border-2 border-blue-500 rounded-l py-2 px-4">
    {children}
  </RKButton>
)
