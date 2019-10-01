import React from 'react'
import styled from 'styled-components'
import LoginForm from './login-form'
import { Auth } from '@vown/auth'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  align-content: center;
  justify-content: center;
  background-color: #4880ff;
`

const App = () => {
  const handleSignIn = async (username: string, password: string, cb: Function) => {
    await Auth.SignIn(username, password)
    cb()
  }

  return (
    <Container>
      <LoginForm onSubmit={handleSignIn} />
    </Container>
  )
}

export default App
