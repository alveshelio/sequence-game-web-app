import { GameActionTypes } from '@actions/gameActionTypes'
import { CardPlayed, Team } from '@appTypes/types'

export type GameActions =
  | { type: GameActionTypes.ADD_CARD; payload: CardPlayed }
  | { type: GameActionTypes.REMOVE_CARD; payload: CardPlayed }
  | { type: GameActionTypes.ADD_TEAM; payload: Team }
