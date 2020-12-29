import React from 'react'
import { GlobalStyles } from 'twin.macro'

import 'styles/globals.css'

function MyApp({ Component, pageProps }): React.ReactElement {
  return (
    <div>
      <GlobalStyles />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
