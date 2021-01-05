import React from 'react'
import tw, { styled } from 'twin.macro'
import { Team } from 'models/team'

interface ChipProps {
  team: Team
}

const StyledChip = styled.div<ChipProps>`
  position: absolute;
  top: calc(50% - 20px);
  left: calc(50% - 20px);
  width: 40px;
  height: 40px;
  ${({ team }) => {
    switch (team.teamColor) {
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

export const Chip: React.FC<ChipProps> = ({ team }: ChipProps): React.ReactElement => {
  return <StyledChip team={team} />
}
