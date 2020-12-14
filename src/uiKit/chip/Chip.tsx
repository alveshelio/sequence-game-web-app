import React from 'react'
import { styled } from 'twin.macro'
import { Team } from '@appTypes/types'

interface ChipProps {
  color: Team
}

const StyledChip = styled.div<ChipProps>`
  position: absolute;
  top: calc(50% - 20px);
  left: calc(50% - 20px);
  width: 40px;
  height: 40px;
  background-color: ${({ color }) => color};
  border-radius: 100%;
  box-shadow: 2px 5px 0 rgba(0, 0, 0, 0.4);
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
    box-shadow: 0 5px 0 rgba(0, 0, 0, 0.2);
  }
`

const Chip: React.FC<ChipProps> = ({ color }: ChipProps): React.ReactElement => {
  return <StyledChip color={color} />
}

export default Chip
