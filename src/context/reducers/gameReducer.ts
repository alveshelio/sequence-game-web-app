import { GameActions } from '@actions/gameActions'
import { GameActionTypes } from '@actions/gameActionTypes'
import { CardPlayed, GameState, Team } from '@appTypes/types'
import { produce } from 'immer'

export const gameReducer = (state: GameState, { type, payload }: GameActions): GameState => {
  switch (type) {
    case GameActionTypes.ADD_CARD:
      return produce(state, (draftState) => {
        draftState.cardsPlayed.push(payload as CardPlayed)
      })
    case GameActionTypes.REMOVE_CARD:
      // eslint-disable-next-line no-case-declarations
      const cardPlayedIndex = state.cardsPlayed.findIndex(
        (card) =>
          card.card === (payload as CardPlayed).card &&
          card.position === (payload as CardPlayed).position
      )
      if (cardPlayedIndex === -1) {
        return state
      }

      return produce(state, (draftState) => {
        draftState.cardsPlayed.splice(cardPlayedIndex, 1)
      })
    case GameActionTypes.ADD_TEAM:
      return produce(state, (draftState) => {
        draftState.teams.push(payload as Team)
      })
    case GameActionTypes.REMOVE_TEAM:
      // eslint-disable-next-line no-case-declarations
      const teamIndex = state.teams.findIndex((team) => team.teamId === payload)

      if (teamIndex === -1) {
        return state
      }

      return produce(state, (draftState) => {
        draftState.teams.splice(teamIndex, 1)
      })
    case GameActionTypes.ADD_PLAYER:
      // eslint-disable-next-line no-case-declarations
      // const tIndex = state.teams.findIndex((team) => team.teamId === payload)

      if (teamIndex === -1) {
        return state
      }

      // return produce(state, (draftState) => {
      //   const player = (payload as TeamPlayer).player
      //
      //   draftState.teams[tIndex].players.push(player)
      // })
      return state

    default:
      return state
  }
}
