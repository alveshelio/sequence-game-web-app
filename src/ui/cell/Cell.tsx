import { Position } from 'models/board'
import { Chip } from 'ui'
import Image from 'next/image'
import React from 'react'
import { styled } from 'twin.macro'

interface CellProps {
  card: string
  position: Position
}

const CellContainer = styled.div`
  position: relative;
`

export const Cell: React.FC<CellProps> = React.memo(
  ({ card, position }: CellProps): React.ReactElement => {
    const cardsPlayed = []
    const matchCardPlayed = cardsPlayed.find(
      (c) => c.card === card && c.position[0] === position.x && c.position[1] === position.y
    )

    return (
      <CellContainer>
        <Image
          className="absolute top-0 left-0"
          src={`/deck/${card}.png`}
          alt={card}
          layout="responsive"
          width={120}
          height={85}
        />
        {matchCardPlayed && <Chip team={matchCardPlayed.team} />}
      </CellContainer>
    )
  }
)

Cell.displayName = 'Cell'
