import { GameActionTypes } from '@actions/gameActionTypes'
import { useGameDispatch, useGameState } from '@context/gameContext'
import { InputGroup } from '@uiKit/*'
import React, { ChangeEvent, useState } from 'react'

interface PlayersProps {
  teamId: string
}
const Players: React.FC<PlayersProps> = ({ teamId }: PlayersProps) => {
  const { teams } = useGameState()
  const dispatch = useGameDispatch()
  const [playerName, setPlayerName] = useState('')
  const players = teams.find((team) => team.teamId === teamId).players

  const teamPlayersMatch = (): boolean => {
    const teamPlayers = teams[0].players.length
    console.warn('teamPlayers', teamPlayers)
    return teams.every((team) => {
      console.warn('team player length', team.players.length)
      return team.players.length === teamPlayers
    })
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPlayerName(e.currentTarget.value)
  }

  const addPlayerHandler = (): void => {
    dispatch({ type: GameActionTypes.ADD_PLAYER, payload: { teamId, player: playerName } })
    setPlayerName('')
    if (teams.length >= 2) {
      if (!teamPlayersMatch()) {
        dispatch({
          type: GameActionTypes.ADD_ERROR,
          payload:
            'Number of players per team do not match. You need the same number of players per team',
        })
      }
    }
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
