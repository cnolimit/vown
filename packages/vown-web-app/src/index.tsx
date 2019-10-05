import React from 'react'
import * as ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import Registration from '@components/registration/registration.container'
import Reviews from '@components/reviews/reviews.container'
import { observer } from 'mobx-react-lite'
import './vendors/normalise.css'
import { state, actions } from '@store/.'

const GlobalStyle = createGlobalStyle`
  * {
      font-family: 'Nunito Sans', sans-serif;
    }
`

const App = observer(() => {
  return (
    <React.Fragment>
      <GlobalStyle />
      {state.loggedIn ? (
        <>
          <button onClick={actions.signOut}>Sign Out</button>
          <Reviews />
        </>
      ) : (
        <Registration />
      )}
    </React.Fragment>
  )
})

ReactDOM.render(<App />, document.getElementById('app'))
