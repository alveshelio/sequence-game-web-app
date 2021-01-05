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
  return (
    <div>
      <div>
        <div>{player.name}</div>
        <div>{player.email}</div>
      </div>
      <div>
        <Button onClick={() => addPlayer({ player: { player_id: player.id }, teamColor })}>
          Add player to {teamColor} team
        </Button>
      </div>
    </div>
  )
}
