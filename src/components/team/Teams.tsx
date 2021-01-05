import { useMutation } from '@apollo/client'
import FriendsList from '@components/friend/FriendsList'
import AddTeam from '@components/team/AddTeam'
import TeamItem from '@components/team/TeamItem'
import { findTeamIndex } from '@components/team/utils'
import { AddPlayerToTeam } from '@models/player'
import React, { useEffect, useState } from 'react'
import { produce } from 'immer'
import { Team, TeamColor } from '@models/team'
import Players from '@components/player/Players'
import tw, { styled } from 'twin.macro'
import { Button } from 'reakit/Button'
import { useRouter } from 'next/router'
import { CREATE_GAME } from 'operations/mutations/games'

interface ContainerProps {
  color: TeamColor
}

const Container = styled.div(({ color }: ContainerProps) => [
  tw`border rounded py-4 px-2 grid justify-center my-8 shadow-xl`,
  color === 'Red' && tw`border-red-500 bg-red-300`,
  color === 'Blue' && tw`border-blue-500 bg-blue-300`,
  color === 'Green' && tw`border-green-500 bg-green-300`,
])

const Teams: React.FC = () => {
  const router = useRouter()
  const [teams, setTeams] = useState<Team[]>([])
  const friends = []

  const addTeam = ({ color, name }: { color: TeamColor; name: string }): void => {
    setTeams(
      produce((draft) => {
        draft.push({ color, name, players: { data: [] } })
      })
    )
  }

  const removeTeam = (teamColor: TeamColor): void => {
    const teamIndex = findTeamIndex({ teams, teamColor })
    setTeams(
      produce((draft) => {
        draft.splice(teamIndex, 1)
      })
    )
  }

  const addPlayerToTeam: AddPlayerToTeam = ({ player, teamColor }) => {
    setTeams(
      produce((draft) => {
        const teamIndex = findTeamIndex({ teams, teamColor })
        draft[teamIndex].players.data.push(player)
      })
    )
  }

  const removePlayerFromTeam = ({
    teamColor,
    playerIndex,
  }: {
    teamColor: TeamColor
    playerIndex: number
  }): void => {
    const teamIndex = findTeamIndex({ teams, teamColor })
    setTeams(
      produce((draft) => {
        draft[teamIndex].players.splice(playerIndex, 1)
      })
    )
  }

  const [createGame, { data, loading }] = useMutation(CREATE_GAME)

  const handleCreateGame = async (): Promise<void> => {
    await createGame({ variables: { teams } })
  }
  console.warn('data', data)

  const canCreateGame = (): boolean => {
    const hasEnoughTeams = teams.length >= 2
    const playersInFirstTeam = teams[0]?.players?.data?.length
    const hasSameNumOfPlayersPerTeam = teams.every(
      (team) => team.players.data.length >= 2 && team.players.data.length === playersInFirstTeam
    )

    return hasEnoughTeams && hasSameNumOfPlayersPerTeam
  }

  useEffect(() => {
    if (data?.insert_games_one) {
      router.push(`/game/${data.insert_games_one.id}`)
    }
  }, [data, router])

  return (
    <div className="md:w-layout grid justify-items-center">
      <AddTeam addTeam={addTeam} teams={teams} />
      {teams.map((team, tIndex) => (
        <Container key={tIndex} color={team.color}>
          <TeamItem key={tIndex} team={team} removeTeam={removeTeam} />
          <Players
            team={team}
            removePlayerFromTeam={removePlayerFromTeam}
            addPlayerToTeam={addPlayerToTeam}
          />
          {friends.length > 0 && (
            <FriendsList
              teamColor={team.color}
              players={friends}
              addPlayerToTeam={addPlayerToTeam}
            />
          )}
        </Container>
      ))}
      {canCreateGame() && (
        <Button
          className="border rounded-md bg-blue-500 text-gray-50 px-4 py-2"
          onClick={handleCreateGame}
        >
          {loading ? 'Creating Game' : 'Create Game'}
        </Button>
      )}
    </div>
  )
}

export default Teams
