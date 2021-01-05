import { Team, TeamColor } from '@models/team'
import { TeamChip } from 'ui'
import React from 'react'
import { Button } from 'reakit'

interface CreateTeamProps {
  teams: Team[]
  addTeam: ({ color, name }: { color: TeamColor; name: string }) => void
}
const AddTeam: React.FC<CreateTeamProps> = ({ addTeam, teams }: CreateTeamProps) => {
  const redTeam = teams.find((t) => t.color === 'Red')
  const greenTeam = teams.find((t) => t.color === 'Green')
  const blueTeam = teams.find((t) => t.color === 'Blue')
  return (
    <div className="grid grid-cols-3 self-center gap-2 md:w-1/2">
      {!redTeam && (
        <Button
          as="div"
          className="grid justify-center"
          onClick={() => addTeam({ color: 'Red', name: 'Red' })}
        >
          <TeamChip color={'Red'} />
          <h2>Add Team</h2>
        </Button>
      )}
      {!blueTeam && (
        <Button
          as="div"
          className="grid justify-center"
          onClick={() => addTeam({ color: 'Blue', name: 'Blue' })}
        >
          <TeamChip color={'Blue'} />
          <h2>Add Team</h2>
        </Button>
      )}
      {!greenTeam && (
        <Button
          as="div"
          className="grid justify-center"
          onClick={() => addTeam({ color: 'Green', name: 'Green' })}
        >
          <TeamChip color={'Green'} />
          <h2>Add Team</h2>
        </Button>
      )}
    </div>
  )
}

export default AddTeam
