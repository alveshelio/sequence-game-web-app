import { GameActionTypes } from '@actions/gameActionTypes'
import { CardPlayed, Team, TeamPlayer } from '@appTypes/types'

export type GameActions =
  | { type: GameActionTypes.ADD_CARD; payload: CardPlayed }
  | { type: GameActionTypes.REMOVE_CARD; payload: CardPlayed }
  | { type: GameActionTypes.ADD_TEAM; payload: Team }
  | { type: GameActionTypes.REMOVE_TEAM; payload: string }
  | { type: GameActionTypes.ADD_ERROR; payload: string }
  | { type: GameActionTypes.REMOVE_ERROR; payload: string }
  | { type: GameActionTypes.ADD_PLAYER; payload: TeamPlayer }
  | { type: GameActionTypes.REMOVE_PLAYER; payload: TeamPlayer }
