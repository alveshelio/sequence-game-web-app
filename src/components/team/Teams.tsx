import { GameActionTypes } from '@actions/gameActionTypes'
import { TeamColor } from '@appTypes/types'
import AddTeam from '@components/team/AddTeam'
import TeamItem from '@components/team/TeamItem'
import { useGameDispatch, useGameState } from '@context/gameContext'
import React from 'react'

const Teams: React.FC = () => {
  const { teams, error } = useGameState()
  const dispatch = useGameDispatch()

  const addTeam = (teamColor: TeamColor, teamId: string): void => {
    dispatch({ type: GameActionTypes.ADD_TEAM, payload: { players: [], teamColor, teamId } })
  }

  return (
    <div className="grid gap-4">
      <AddTeam addTeam={addTeam} />
      {teams.map((team, tIndex) => (
        <TeamItem key={tIndex} team={team} />
      ))}
      {error && <p>{error}</p>}
    </div>
  )
}

export default Teams
