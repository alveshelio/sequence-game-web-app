import { Team, TeamColor } from 'models/team'
import React from 'react'
import { Button } from 'ui'

interface TeamProps {
  team: Team
  removeTeam: (teamColor: TeamColor) => void
}

const TeamItem: React.FC<TeamProps> = ({ team, removeTeam }: TeamProps) => {
  return (
    <div className="grid justify-center w-full">
      <h2 className="text-xl">Team: {team.color}</h2>
      <div className="mb-4">
        <Button onClick={() => removeTeam(team.color)}>Remove Team</Button>
      </div>
    </div>
  )
}

export default TeamItem
