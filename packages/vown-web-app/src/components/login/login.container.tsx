import React, { useState } from 'react'
import styled from 'styled-components'
import { LoginForm } from '@vown/components'
import OvalShape from '@assets/oval_shape.svg'
import { observer } from 'mobx-react-lite'
import { actions } from '@store/.'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #4880ff;
  background-image: url(${OvalShape});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  @media (min-width: 768px) {
    display: grid;
    align-content: center;
    justify-content: center;
  }
`

const FormWrapper = styled.div`
  overflow: hidden;
  height: 100%;
  @media (min-width: 768px) {
    border-radius: 15px;
    width: 500px;
  }
`

interface ILoginFormData {
  username: string
  password: string
  rememberPassword: boolean
}

const Login = observer(() => {
  const [loading, setLoading] = useState(false)

  const handleSignIn = (data: ILoginFormData) => {
    setLoading(true)
    actions.signIn(data.username, data.password).catch(() => {
      setLoading(false)
    })
  }

  return (
    <Container>
      <FormWrapper>
        <LoginForm loading={loading} onSubmit={handleSignIn} />
      </FormWrapper>
    </Container>
  )
})

export default Login
