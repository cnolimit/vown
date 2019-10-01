import React, { useEffect, useState } from 'react'
import * as ReactDOM from 'react-dom'
import Login from '@components/login/login.container'
import Reviews from '@components/reviews/reviews.container'
import './vendors/normalise.css'
import { Auth } from '@vown/auth'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const checkLoggedIn = async () => setLoggedIn(await Auth.isLoggedIn())
    checkLoggedIn()
  }, [])

  return (
    <React.Fragment>
      {loggedIn ? (
        <div>
          <button onClick={Auth.SignOut}>Sign Out</button>
          <Reviews />
        </div>
      ) : (
        <Login />
      )}
    </React.Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
