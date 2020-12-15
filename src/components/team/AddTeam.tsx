import { TeamColor } from '@appTypes/types'
import { useGameState } from '@context/gameContext'
import { TeamChip } from '@uiKit/*'
import React from 'react'
import { Button } from 'reakit'

interface CreateTeamProps {
  addTeam: (color: TeamColor, teamId: string) => void
}
const AddTeam: React.FC<CreateTeamProps> = ({ addTeam }: CreateTeamProps) => {
  const { teams } = useGameState()
  const teamRedSelected = teams.some((team) => team.teamColor === 'Red')
  const teamBlueSelected = teams.some((team) => team.teamColor === 'Blue')
  const teamGreenSelected = teams.some((team) => team.teamColor === 'Green')
  return (
    <div className="grid grid-cols-3 gap-2 w-96">
      {!teamRedSelected && (
        <Button as="div" className="grid justify-center" onClick={() => addTeam('Red', 'Red')}>
          <TeamChip color={'Red'} />
          <h2>Add Team</h2>
        </Button>
      )}
      {!teamBlueSelected && (
        <Button as="div" className="grid justify-center" onClick={() => addTeam('Blue', 'Blue')}>
          <TeamChip color={'Blue'} />
          <h2>Add Team</h2>
        </Button>
      )}
      {!teamGreenSelected && (
        <Button as="div" className="grid justify-center" onClick={() => addTeam('Green', 'Green')}>
          <TeamChip color={'Green'} />
          <h2>Add Team</h2>
        </Button>
      )}
    </div>
  )
}

export default AddTeam
