import { useMutation } from '@apollo/client'
import FriendsList from '@components/friend/FriendsList'
import Players from '@components/player/Players'
import AddTeam from '@components/team/AddTeam'
import TeamItem from '@components/team/TeamItem'
import { findTeamIndex } from '@components/team/utils'
import { AddPlayerToTeam, RemovePlayerFromTeam, TeamPlayers } from '@models/player'
import { Team, TeamColor } from '@models/team'
import { produce } from 'immer'
import { useRouter } from 'next/router'
import { CREATE_GAME } from 'operations/mutations/games'
import React, { useEffect, useState } from 'react'
import { Button } from 'reakit/Button'
import tw, { styled } from 'twin.macro'

interface ContainerProps {
  color: TeamColor
}

const Container = styled.div(({ color }: ContainerProps) => [
  tw`border rounded py-4 px-2 my-8 shadow-xl w-full`,
  color === 'Red' && tw`border-red-500 bg-red-300`,
  color === 'Blue' && tw`border-blue-500 bg-blue-300`,
  color === 'Green' && tw`border-green-500 bg-green-300`,
])

const Teams: React.FC = () => {
  const router = useRouter()
  const [teams, setTeams] = useState<Team[]>([])
  const [teamPlayers, setTeamPlayers] = useState<TeamPlayers>({
    Red: {
      players: [],
    },
    Blue: {
      players: [],
    },
    Green: {
      players: [],
    },
  })

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

  const addPlayerToTeam: AddPlayerToTeam = ({ email, teamColor, playerId }) => {
    if (playerId) {
      setTeams(
        produce((draft) => {
          const teamIndex = findTeamIndex({ teams, teamColor })
          draft[teamIndex].players.data.push({ player: { player_id: playerId }, teamColor })
        })
      )
    } else {
      setTeams(
        produce((draft) => {
          const teamIndex = findTeamIndex({ teams, teamColor })
          draft[teamIndex].players.data.push({
            player: { player: { data: { email } } },
            teamColor,
          })
        })
      )
    }

    setTeamPlayers((prevState) => {
      return {
        ...prevState,
        [teamColor]: {
          players: [...prevState[teamColor].players, email],
        },
      }
    })
  }

  const removePlayerFromTeam: RemovePlayerFromTeam = ({ teamColor, playerIndex, email }): void => {
    const teamIndex = findTeamIndex({ teams, teamColor })
    setTeams(
      produce((draft) => {
        draft[teamIndex].players.data.splice(playerIndex, 1)
      })
    )

    setTeamPlayers(
      produce((draft) => {
        const emailIndex = draft[teamColor].players.findIndex(
          (playerEmail) => playerEmail === email
        )
        draft[teamColor].players.splice(emailIndex, 1)
      })
    )
  }

  const [createGame, { data, loading }] = useMutation(CREATE_GAME)

  const handleCreateGame = async (): Promise<void> => {
    await createGame({ variables: { teams } })
  }

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
    <div className="md:w-layout">
      <AddTeam addTeam={addTeam} teams={teams} />
      {teams.map((team, tIndex) => (
        <Container key={tIndex} color={team.color}>
          <TeamItem key={tIndex} team={team} removeTeam={removeTeam} />
          <Players
            team={team}
            teamPlayers={teamPlayers}
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
