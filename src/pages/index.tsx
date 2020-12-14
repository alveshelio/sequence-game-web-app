import React from 'react'

import Layout from '@components/layout/Layout'
import Board from '@components/board/Board'

export default function Home(): React.ReactElement {
  return (
    <Layout title="Sequence Game">
      <Board />
    </Layout>
  )
}
