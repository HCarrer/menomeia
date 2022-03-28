import React from 'react'
import { WordProvider } from '../context/WordContext'

function MyApp({ Component, pageProps }) {
  return (
    <WordProvider>
      <Component {...pageProps} />
    </WordProvider>
  )
}

export default MyApp
