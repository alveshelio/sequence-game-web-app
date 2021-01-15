export type Position = {
  x: number
  y: number
}

export interface BoardItem {
  position: Position
  card: string
  played: boolean
}

export type Board = BoardItem[][]
