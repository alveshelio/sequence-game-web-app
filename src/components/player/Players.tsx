import { InputGroup } from '../../ui'
import React, { ChangeEvent, useState } from 'react'

interface PlayersProps {
  teamId: string
}
const Players: React.FC<PlayersProps> = ({ teamId }: PlayersProps) => {
  const [playerName, setPlayerName] = useState('')
  const teams = []

  const players = teams.find((team) => team.teamId === teamId).players

  // const teamPlayersMatch = (): boolean => {
  //   const teamPlayers = teams[0].players.length
  //   console.warn('teamPlayers', teamPlayers)
  //   return teams.every((team) => {
  //     console.warn('team player length', team.players.length)
  //     return team.players.length === teamPlayers
  //   })
  // }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPlayerName(e.currentTarget.value)
  }

  const addPlayerHandler = (): void => {
    setPlayerName('')
  }

  return (
    <div>
      <InputGroup
        onChange={handleOnChange}
        onClick={addPlayerHandler}
        value={playerName}
        placeholder="Player Name"
        buttonLabel="Add Player"
        inputMode="email"
      />
      <ul>
        {players.map((p, pIndex) => (
          <li key={pIndex}>{p}</li>
        ))}
      </ul>
    </div>
  )
}

export default Players
