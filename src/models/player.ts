import { TeamColor } from '@models/team'

export interface ExistingPlayer extends PlayerInput {
  id
}

export interface PlayerInput {
  name: string
  email: string
}

export interface PlayersDataPlayerInput {
  player: {
    data: PlayerInput
  }
}

export interface PlayersDataPlayerId {
  player_id: string
}

export type Player = PlayersDataPlayerInput | PlayersDataPlayerId

interface AddPlayerToTeamProps {
  player: Player
  teamColor: TeamColor
}

export interface AddPlayerToTeam {
  ({ player, teamColor }: AddPlayerToTeamProps): void
}
