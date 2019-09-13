import React from 'react'
import * as ReactDOM from 'react-dom'
import LoginContainer from '@components/login/login.container'
import './vendors/normalise.css'
// import Auth from '@vown/auth'

const App = () => {
  return (
    <React.Fragment>
      <LoginContainer />
    </React.Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
