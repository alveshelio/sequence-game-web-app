import { TeamColor } from '@appTypes/types'
import AddTeam from '@components/team/AddTeam'
// import TeamItem from '@components/team/TeamItem'
import React from 'react'

const Teams: React.FC = () => {
  const addTeam = (teamColor: TeamColor, teamId: string): void => {
    console.warn('add team', teamColor, teamId)
  }

  return (
    <div className="grid gap-4">
      <AddTeam addTeam={addTeam} />
      {/*{teams.map((team, tIndex) => (*/}
      {/*  <TeamItem key={tIndex} team={team} />*/}
      {/*))}*/}
    </div>
  )
}

export default Teams
