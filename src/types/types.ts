import React from 'react'

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
  teamId: string
  players: Player[]
  teamColor: TeamColor
}

export interface TeamPlayer {
  teamId: string
  player: string
}

export interface GameState {
  cardsPlayed: CardPlayed[]
  teams: Team[]
  error: string | null
}

export interface GameContextProps {
  children: React.ReactNode
}
