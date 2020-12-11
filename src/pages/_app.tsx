import '../styles/globals.css'
import React from 'react'

function MyApp({ Component, pageProps }): React.ReactElement {
  return <Component {...pageProps} />
}

export default MyApp
