import React, { useState } from 'react'
import { Card, Typography, TextField, Link } from '@material-ui/core'
import { styled } from '@material-ui/styles'
import { Button, OverflowLoader } from '@vown/components'

const Container = styled(Card)({
  width: '100%',
  position: 'relative',
  'text-align': 'center',
  'border-radius': '15px',
  'background-color': 'white',
})

const MarginTypography = styled(Typography)({
  margin: '15px 0',
})

const StyledTextField = styled(TextField)({
  width: '85%',
  'background-color': '!important #F1F4F9',
  color: '#A6A6A6',
  'font-size': '1.2em',
  'border-radius': '5px',
})

interface ILoginForm {
  onSubmit: Function
}

const LoginForm = ({ onSubmit }: ILoginForm) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fetching, setFetching] = useState(false)

  const handleFormSubmit = () => {
    setFetching(true)
    onSubmit(username, password, () => setFetching(false))
  }

  return (
    <Container>
      <OverflowLoader loading={fetching}>
        <div style={{ padding: '50px 0' }}>
          <MarginTypography variant="h5">Login to Account</MarginTypography>
          <MarginTypography variant="subtitle2">
            Please enter your email and password to continue
          </MarginTypography>
          <StyledTextField
            id="username"
            margin="normal"
            label="Username"
            type="text"
            onChange={e => setUsername(e.target.value)}
          />
          <StyledTextField
            id="password"
            margin="normal"
            label="Password"
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
          <Button onClick={handleFormSubmit}>Sign In</Button>
          <MarginTypography variant="subtitle2">
            Don't have an account? <Link>Create Account</Link>
          </MarginTypography>
        </div>
      </OverflowLoader>
    </Container>
  )
}

export default LoginForm
