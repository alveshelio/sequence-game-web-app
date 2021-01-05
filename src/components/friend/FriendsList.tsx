import Friend from '@components/friend/Friend'
import { ExistingPlayer, AddPlayerToTeam } from '@models/player'
import { TeamColor } from '@models/team'
import React from 'react'
interface FriendsListProps {
  teamColor: TeamColor
  players: ExistingPlayer[]
  addPlayerToTeam: AddPlayerToTeam
}

const FriendsList: React.FC<FriendsListProps> = ({
  teamColor,
  players,
  addPlayerToTeam,
}: FriendsListProps): React.ReactElement => {
  return (
    <div>
      {players.map((player) => (
        <Friend key={player.id} player={player} teamColor={teamColor} addPlayer={addPlayerToTeam} />
      ))}
    </div>
  )
}

export default FriendsList
