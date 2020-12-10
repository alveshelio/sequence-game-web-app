import Head from 'next/head'
import React from 'react'

interface LayoutProps {
  children: React.ReactNode
  title: string
}
const Layout: React.FC<LayoutProps> = ({ children, title }: LayoutProps): React.ReactElement => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
    </div>
  )
}

export default Layout
