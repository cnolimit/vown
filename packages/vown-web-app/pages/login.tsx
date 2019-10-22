import * as React from 'react'
import styled from 'styled-components'
import { LoginForm } from '@vown/components'
import { observer } from 'mobx-react-lite'
import { actions } from '../store'
import { ROUTES, COOKIE } from '../utils/constants'
import { isTokenValid } from '../utils/auth'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #4880ff;
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

const Login = () => {
  const [loading, setLoading] = React.useState(false)
  const handleSignIn = (data: ILoginFormData) => {
    setLoading(true)
    actions
      .signIn(data.username, data.password)
      .then(() => setLoading(false))
      .catch(() => setLoading(false))
  }

  return (
    <Container>
      <FormWrapper>
        <LoginForm loading={loading} onSubmit={handleSignIn} />
      </FormWrapper>
    </Container>
  )
}

Login.getInitialProps = (ctx: any) => {
  if (isTokenValid(ctx)) {
    ctx.res.writeHead(303, { Location: ROUTES.dashboard })
    ctx.res.end()
  }

  return { session: ctx[COOKIE.token] }
}

export default observer(Login)
