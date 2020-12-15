import { Position } from '@appTypes/types'
import { Cell } from 'uiKit'
import React from 'react'
import { styled } from 'twin.macro'
import { board } from './data/gameData'

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  gap: 5px;
  height: 100vh;
  width: 1200px;
`

const Board = (): React.ReactElement => {
  let x = 0
  let y = 0

  return (
    <BoardContainer>
      {board.flat().map((card, cardIndex) => {
        const position: Position = [y, x]
        x++
        if (x > 9) {
          x = 0
          y++
        }

        return <Cell key={cardIndex} card={card} position={position} />
      })}
    </BoardContainer>
  )
}

export default Board
