import { TeamColor } from '@models/team'

export interface ExistingPlayer {
  id: string
  name: string
  email: string
}

export interface PlayersDataPlayerInput {
  player: {
    data: {
      email: string
    }
  }
}

export interface PlayersDataPlayerId {
  player_id: string
}

export type Player = PlayersDataPlayerInput | PlayersDataPlayerId

export type PlayerInput = { playerId: string } | { email: string }

interface AddPlayerToTeamProps {
  email: string
  teamColor: TeamColor
  playerId?: string
}

export interface AddPlayerToTeam {
  ({ email, teamColor, playerId }: AddPlayerToTeamProps): void
}

export interface RemovePlayerFromTeamProps {
  email: string
  teamColor: TeamColor
  playerIndex: number
}
export interface RemovePlayerFromTeam {
  ({ email, teamColor, playerIndex }: RemovePlayerFromTeamProps): void
}

export interface TeamPlayers {
  Red: {
    players: string[]
  }
  Blue: {
    players: string[]
  }
  Green: {
    players: string[]
  }
}
