import React from 'react'
import { GameActions } from '@actions/gameActions'

export type TeamColor = 'Red' | 'Green' | 'Blue'
export type Position = [number, number]

export interface CardPlayed {
  card: string
  position: Position
  team: Team
}

interface Player {
  id: string
  name: string
}

export interface Team {
  players: Player[]
  teamColor: TeamColor
}

export interface GameState {
  cardsPlayed: CardPlayed[]
  teams: Team[]
}

export type Dispatch = (action: GameActions) => void

export interface GameContextProps {
  children: React.ReactNode
}
