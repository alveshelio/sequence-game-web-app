import { PlayersDataPlayerId, PlayersDataPlayerInput } from './player'

export type TeamColor = 'Red' | 'Green' | 'Blue'

export interface Team {
  name: string
  color: TeamColor
  players: {
    data: [PlayersDataPlayerInput | PlayersDataPlayerId]
  }
}

export interface Game {
  teams: Team[]
  winnerId: string
  createdAt: Date
}
