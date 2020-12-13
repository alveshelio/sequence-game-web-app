import React from 'react'
import { styled } from 'twin.macro'
import { Team } from '../../types/types'
import Cell from '../../uiKit/cell/Cell'
import { board } from './data/gameData'

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  gap: 5px;
  height: 100vh;
  width: 75vh;
`

const teams: Team[] = ['Green', 'Red', 'Blue']

const Board = (): React.ReactElement => {
  return (
    <BoardContainer>
      {board.flat().map((card, cardIndex) => (
        <Cell
          key={cardIndex}
          card={card}
          hasChip={Math.random() < 0.5}
          team={teams[Math.floor(Math.random() * 2)]}
        />
      ))}
    </BoardContainer>
  )
}

export default Board
