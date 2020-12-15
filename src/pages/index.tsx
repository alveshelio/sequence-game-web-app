import NewGame from '@components/newGame/NewGame'
import React from 'react'

import Layout from '@components/layout/Layout'

export default function Home(): React.ReactElement {
  return (
    <Layout title="Sequence Game">
      <NewGame />
    </Layout>
  )
}
