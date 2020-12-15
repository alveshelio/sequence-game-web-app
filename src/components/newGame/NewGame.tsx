import Teams from '@components/team/Teams'
import { useGameState } from '@context/gameContext'
import { Button } from '@uiKit/*'
import React from 'react'

const CreateNewGame: React.FC = () => {
  const { teams } = useGameState()

  const canCreateGame = (): boolean => {
    return teams.length >= 2
  }

  return (
    <div>
      <Teams />
      {canCreateGame() && <Button>Create Game</Button>}
    </div>
  )
}

export default React.memo(CreateNewGame)
