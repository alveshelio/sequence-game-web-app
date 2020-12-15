import React from 'react'
import tw, { styled } from 'twin.macro'
import { TeamColor } from '@appTypes/types'

interface ChipProps {
  color: TeamColor
}

const StyledChip = styled.div<ChipProps>`
  position: relative;
  justify-self: center;
  margin-bottom: 1rem;
  width: 40px;
  height: 40px;
  ${({ color }) => {
    switch (color) {
      case 'Green':
        return tw`bg-green-500`
      case 'Blue':
        return tw`bg-blue-500`
      case 'Red':
        return tw`bg-red-500`
    }
  }};
  border-radius: 100%;
  box-shadow: 1px 3px 0 rgba(0, 0, 0, 0.4);
  z-index: 20;

  &:after {
    content: '';
    width: 25px;
    height: 25px;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.1);
    top: 50%;
    left: 50%;
    transform: translatex(-50%) translatey(-50%);
    border-radius: 100%;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.2);
  }
`

export const TeamChip: React.FC<ChipProps> = ({ color }: ChipProps): React.ReactElement => {
  return <StyledChip color={color} />
}
