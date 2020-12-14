import { GameProvider } from '@context/gameContext'
import React from 'react'
import { GlobalStyles } from 'twin.macro'

import 'styles/globals.css'

function MyApp({ Component, pageProps }): React.ReactElement {
  return (
    <GameProvider>
      <div>
        <GlobalStyles />
        <Component {...pageProps} />
      </div>
    </GameProvider>
  )
}

export default MyApp
