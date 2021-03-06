import { Position } from 'models/board'
import { Cell } from 'ui'
import React from 'react'
import { styled } from 'twin.macro'
import { GET_CARDS } from 'operations/queries/board'
import { board } from './data/gameData'
import { useQuery } from '@apollo/client'

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
  const { data: boardData, loading, error } = useQuery(GET_CARDS, {
    context: {
      headers: {
        'x-hasura-role': 'user',
      },
    },
  })
  console.warn('data', boardData)

  if (loading) {
    return <p>loading</p>
  }

  if (error) {
    return <p>There was an error: {error.message}</p>
  }

  return (
    <BoardContainer>
      {board.flat().map((card, cardIndex) => {
        const position: Position = { y, x }
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
