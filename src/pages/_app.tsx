import React from 'react'
import { NhostAuthProvider } from '@nhost/react-auth'
import { NhostApolloProvider } from '@nhost/react-apollo'

import { auth } from 'libs/nhost'
import { GlobalStyles } from 'twin.macro'
import { cache } from 'cache/cache'
import 'styles/globals.css'

function MyApp({ Component, pageProps }): React.ReactElement {
  return (
    <NhostAuthProvider auth={auth}>
      <NhostApolloProvider
        cache={cache}
        auth={auth}
        gqlEndpoint={process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}
      >
        <GlobalStyles />
        <Component {...pageProps} />
      </NhostApolloProvider>
    </NhostAuthProvider>
  )
}

export default MyApp
