import React from 'react'

import Layout from '@components/layout/Layout'
import Input from '@uiKit/input/Input'

export default function Home(): React.ReactElement {
  return (
    <Layout title="Sequence Game">
      <h2 className="text-3xl">What&apos;s new</h2>
      <Input hasHover={true} />
    </Layout>
  )
}
