import Head from 'next/head'
import React from 'react'
import Link from 'next/link'
interface LayoutProps {
  children: React.ReactNode
  title: string
}
const Layout: React.FC<LayoutProps> = ({ children, title }: LayoutProps): React.ReactElement => {
  return (
    <div className="grid grid-rows-layout mx-4">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <nav className="flex justify-center">
          <ul className="flex justify-between gap-8 h-full pt-2 items-center mt-2 max-w-sm">
            <li>
              <Link href="/">
                <a className="border border-blue-200 hover:border-blue-600 bg-blue-500 text-white hover:text-blue-100 py-2 px-2 rounded-md">
                  Home
                </a>
              </Link>
            </li>
            <li>
              <Link href="/game/new">
                <a className="border border-blue-200 hover:border-blue-600 bg-blue-500 text-white hover:text-blue-100 py-2 px-2 rounded-md">
                  Create New Game
                </a>
              </Link>
            </li>
            <li>
              <Link href="/login">
                <a className="border border-blue-200 hover:border-blue-600 bg-blue-500 text-white hover:text-blue-100 py-2 px-2 rounded-md">
                  Login
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="grid items-start justify-items-center ">{children}</main>
    </div>
  )
}

export default Layout
