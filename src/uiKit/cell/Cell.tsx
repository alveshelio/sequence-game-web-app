import Image from 'next/image'
import React from 'react'
import { styled } from 'twin.macro'

import { Team } from '../../types/types'
import Chip from '../chip/Chip'

interface CellProps {
  card: string
  hasChip: boolean
  team: Team
}

const CellContainer = styled.div`
  position: relative;
`

const Cell: React.FC<CellProps> = ({ card, hasChip, team }: CellProps): React.ReactElement => {
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
      {hasChip && <Chip color={team} />}
    </CellContainer>
  )
}

export default Cell
