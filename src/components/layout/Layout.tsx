import Head from 'next/head'
import React from 'react'
import { styled } from 'twin.macro'

const Container = styled.div`
  display: grid;
  justify-content: center;
`

interface LayoutProps {
  children: React.ReactNode
  title: string
}
const Layout: React.FC<LayoutProps> = ({ children, title }: LayoutProps): React.ReactElement => {
  return (
    <Container>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
    </Container>
  )
}

export default Layout
