import { useLazyQuery } from '@apollo/client'
import { AddPlayerToTeam, RemovePlayerFromTeam, TeamPlayers } from '@models/player'
import { Team } from '@models/team'
import { FIND_USER_OR_PLAYER_BY_EMAIL } from 'operations/queries/players'
import React, { ChangeEvent, useState } from 'react'
import { Button } from 'reakit/Button'
import { Input } from 'reakit/Input'

interface PlayersProps {
  team: Team
  teamPlayers: TeamPlayers
  removePlayerFromTeam: RemovePlayerFromTeam
  addPlayerToTeam: AddPlayerToTeam
}
const Players: React.FC<PlayersProps> = ({
  team,
  teamPlayers,
  removePlayerFromTeam,
  addPlayerToTeam,
}: PlayersProps) => {
  const [email, setEmail] = useState('')

  /*
    When adding a player to a team, we'll check if the player has been associated with a user
    by checking if `player_id` in user has been set
    If not we check if there's already a player with this email address, if so we'll grab the id
    Lastly, if no user associated with a player nor a player is found, then we create a new player
   */
  const [findUserOrPlayerByEmail] = useLazyQuery(FIND_USER_OR_PLAYER_BY_EMAIL, {
    fetchPolicy: 'network-only',
    context: {
      headers: {
        'x-hasura-role': 'me',
      },
    },
    onCompleted: (data) => {
      if (data.users.length && data.users[0].player_id !== null) {
        addPlayerToTeam({
          email,
          teamColor: team.color,
          playerId: data.users[0].player_id,
        })
      } else if (data.players.length) {
        addPlayerToTeam({
          email,
          teamColor: team.color,
          playerId: data.players[0].id,
        })
      } else {
        addPlayerToTeam({ email, teamColor: team.color })
      }
      setEmail('')
    },
  })

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const email = e.currentTarget.value
    setEmail(email)
  }

  const handleAddPlayer = (): void => {
    findUserOrPlayerByEmail({ variables: { userEmail: email, playerEmail: email } })
  }

  return (
    <div className="border border-gray-500 shadow-md px-2 py-2 w-full">
      {teamPlayers[team.color].players.length > 0 && <h3>Players</h3>}
      <ul>
        {teamPlayers[team.color].players.map((email, pIndex) => (
          <li key={pIndex}>
            {email}{' '}
            <Button
              onClick={() =>
                removePlayerFromTeam({ playerIndex: pIndex, teamColor: team.color, email })
              }
            >
              Remove Player
            </Button>
          </li>
        ))}
      </ul>
      <div className="flex justify-between">
        <Input
          className="w-2/4 border border-gray-500  px-2 py-1"
          type="text"
          onChange={handleEmailChange}
          value={email}
          placeholder="Player Email"
        />
        <Button
          disabled={email.length === 0}
          className="border border-blue-500 bg-blue-600 text-gray-50 px-2 py-1 disabled:opacity-50"
          onClick={handleAddPlayer}
        >
          Add Player
        </Button>
      </div>
    </div>
  )
}

export default React.memo(Players)
