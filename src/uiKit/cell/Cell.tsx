import { Position } from '@appTypes/types'
import { useGameState } from '@context/gameContext'
import Chip from '@uiKit/chip/Chip'
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

const Cell: React.FC<CellProps> = ({ card, position }: CellProps): React.ReactElement => {
  const { cardsPlayed } = useGameState()
  const matchCardPlayed = cardsPlayed.find((c) => c.card === card && c.position === position)

  return (
    <CellContainer>
      <Image
        className="absolute top-0 left-0"
        src={`/deck/${card}.png`}
        alt={card}
        layout="responsive"
        width={450}
        height={630}
      />
      {matchCardPlayed && <Chip color={matchCardPlayed.team} />}
    </CellContainer>
  )
}

export default React.memo(Cell)
