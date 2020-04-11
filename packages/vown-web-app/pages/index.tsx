import { Link } from '@material-ui/core'
import * as React from 'react'
import { ROUTES } from 'types'

function Home() {
  return (
    <React.Fragment>
      <h1>
        <Link href={ROUTES.login}>Login</Link>
      </h1>

      <h1>
        <Link href={ROUTES.dashboard}>Dashboard</Link>
      </h1>
    </React.Fragment>
  )
}

export default Home
