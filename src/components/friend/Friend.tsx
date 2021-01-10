import { AddPlayerToTeam, ExistingPlayer } from '@models/player'
import { TeamColor } from '@models/team'
import React from 'react'
import { Button } from 'reakit/Button'

interface FriendProps {
  player: ExistingPlayer
  teamColor: TeamColor
  addPlayer: AddPlayerToTeam
}

export default function Friend({ player, teamColor, addPlayer }: FriendProps): React.ReactElement {
  const handleAddPlayer = (): void => {
    addPlayer({ playerId: player.id, teamColor, email: player.email })
  }

  return (
    <div>
      <div>
        <div>{player.name}</div>
        <div>{player.email}</div>
      </div>
      <div>
        <Button onClick={handleAddPlayer}>Add player</Button>
      </div>
    </div>
  )
}
