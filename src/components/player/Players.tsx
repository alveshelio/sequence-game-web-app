import { useLazyQuery } from '@apollo/client'
import { Player, PlayerInput } from '@models/player'
import { Team, TeamColor } from '@models/team'
import { Button } from 'reakit/Button'
import { Input } from 'reakit/Input'
import React, { ChangeEvent, useState } from 'react'
import { FIND_PLAYER_BY_EMAIL } from '../../operations/queries/players'

interface PlayersProps {
  team: Team
  removePlayerFromTeam: ({
    playerIndex,
    teamColor,
  }: {
    playerIndex: number
    teamColor: TeamColor
  }) => void
  addPlayerToTeam: ({ player, teamColor }: { player: Player; teamColor: TeamColor }) => void
}
const Players: React.FC<PlayersProps> = ({
  team,
  removePlayerFromTeam,
  addPlayerToTeam,
}: PlayersProps) => {
  const [player, setPlayer] = useState<PlayerInput>({
    name: '',
    email: '',
  })

  const [players, setPlayers] = useState<PlayerInput[]>([])

  const [findUserByEmail] = useLazyQuery(FIND_PLAYER_BY_EMAIL, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      if (data.players.length) {
        addPlayerToTeam({
          player: { player_id: data.players[0].id as string },
          teamColor: team.color,
        })
      } else {
        addPlayerToTeam({ player: { player: { data: player } }, teamColor: team.color })
      }
      setPlayer({ name: '', email: '' })
    },
  })

  const onPlayerNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const name = e.currentTarget.value
    setPlayer((prevPlayer) => ({ ...prevPlayer, name }))
  }

  const onPlayerEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const email = e.currentTarget.value
    setPlayer((prevPlayer) => ({ ...prevPlayer, email }))
  }

  const handleAddPlayer = () => {
    findUserByEmail({ variables: { email: player.email } })
    setPlayers((prevPlayers) => [...prevPlayers, player])
  }

  return (
    <div className="border border-gray-500 shadow-md px-2 py-2">
      {players.length > 0 && <h3>Players</h3>}
      <ul>
        {players.map((p, pIndex) => (
          <li key={pIndex}>
            {p.name} {p.email}{' '}
            <Button
              onClick={() => removePlayerFromTeam({ playerIndex: pIndex, teamColor: team.color })}
            >
              Remove Player
            </Button>
          </li>
        ))}
      </ul>
      <div className="flex justify-between">
        <Input
          className="w-1/4 border border-gray-500 px-2 py-1"
          type="text"
          onChange={onPlayerNameChange}
          value={player.name}
          placeholder="Player Name"
        />

        <Input
          className="w-2/4 border border-gray-500  px-2 py-1"
          type="text"
          onChange={onPlayerEmailChange}
          value={player.email}
          placeholder="Player Email"
        />
        <Button
          disabled={player.name.length === 0 && player.email.length === 0}
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
