import React, { ChangeEvent, useEffect, useRef } from 'react'
import { Input, InputProps } from 'reakit/Input'
import { Button } from 'reakit/Button'

interface InputGroupProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onClick: () => void
  value: string | number
  placeholder: string
  buttonLabel: React.ReactNode
}

type Props = InputGroupProps & InputProps

export const InputGroup: React.FC<Props> = ({
  onChange,
  onClick,
  placeholder,
  value,
  buttonLabel,
  ...rest
}: InputGroupProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef?.current?.focus()
  }, [])

  const handleClick = (): void => {
    onClick()
    inputRef?.current?.focus()
  }

  return (
    <div className="bg-transparent">
      <Input
        ref={inputRef}
        className="border-l-2 border-t-2 border-b-2 border-blue-400 rounded-tl-lg rounded-bl-lg px-4 py-2 bg-transparent text-xl text-gray-600"
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        {...rest}
      />
      <Button
        className="border-t-2 border-r-2 border-b-2 border-blue-400 rounded-tr-lg rounded-br-lg py-2 px-2 text-xl bg-blue-500 text-gray-50"
        onClick={handleClick}
      >
        {buttonLabel}
      </Button>
    </div>
  )
}
