import Teams from '@components/team/Teams'
import { Button } from '../../ui'
import React from 'react'

const CreateNewGame: React.FC = () => {
  return (
    <div>
      <Teams />
      <Button>Create Game</Button>
    </div>
  )
}

export default React.memo(CreateNewGame)
