import { Team, TeamColor } from '@appTypes/types'
import Players from '@components/player/Players'
import React from 'react'
import tw, { styled } from 'twin.macro'
import { Button } from 'uiKit'

interface TeamProps {
  team: Team
}

interface ContainerProps {
  color: TeamColor
}

const Container = styled.div(({ color }: ContainerProps) => [
  tw`border rounded py-4 px-2 grid justify-center`,
  color === 'Red' && tw`border-red-500 bg-red-300`,
  color === 'Blue' && tw`border-blue-500 bg-blue-300`,
  color === 'Green' && tw`border-green-500 bg-green-300`,
])

const TeamItem: React.FC<TeamProps> = ({ team }: TeamProps) => {
  return (
    <Container color={team.teamColor}>
      <h2 className="text-xl">Team: {team.teamColor}</h2>
      <div className="mb-4">
        <Button
          onClick={() => {
            console.warn('remove team')
          }}
        >
          Remove Team
        </Button>
      </div>
      <Players teamId={team.teamId} />
    </Container>
  )
}

export default TeamItem
