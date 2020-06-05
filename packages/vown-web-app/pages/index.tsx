import Router from 'next/router'
import * as React from 'react'

const Home = () => {
  React.useEffect(() => {
    const { pathname } = Router
    if (pathname == '/') {
      Router.push('/login')
    }
  })
  return null
}

export default Home
