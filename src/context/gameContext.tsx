import { Dispatch, GameContextProps, GameState } from '@appTypes/types'
import { gameReducer } from '@reducers/gameReducer'
import React from 'react'

const GameStateContext = React.createContext<GameState | undefined>(undefined)

const GameDispatchContext = React.createContext<Dispatch | undefined>(undefined)

const initialState: GameState = {
  cardsPlayed: [],
  teams: [],
  error: null,
}

const GameProvider: React.FC<GameContextProps> = ({ children }: GameContextProps) => {
  const [state, dispatch] = React.useReducer(gameReducer, initialState)
  return (
    <GameStateContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>{children}</GameDispatchContext.Provider>
    </GameStateContext.Provider>
  )
}

const useGameState = (): GameState => {
  const context = React.useContext(GameStateContext)

  if (context === undefined) {
    throw new Error('useAppState must be used within AppProvider')
  }
  return context
}

const useGameDispatch = (): Dispatch => {
  const context = React.useContext(GameDispatchContext)

  if (context === undefined) {
    throw new Error('useAppDispatch must be used within AppProvider')
  }

  return context
}

export { GameProvider, useGameState, useGameDispatch }
