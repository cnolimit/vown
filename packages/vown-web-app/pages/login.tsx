import { LoginForm } from '@vown/components'
import { ERRORS, NOTIFICATION_STATES, SUCCESS } from '@vown/types'
import FormWrapper from 'components/form-wrapper'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { actions } from 'store'
import styled from 'styled-components'
import { COOKIE, ROUTES } from 'types'
import { auth } from 'utils'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  @media (min-width: 768px) {
    display: grid;
    align-content: center;
    justify-content: center;
  }
`

interface ILoginFormData {
  username: string
  password: string
  rememberPassword: boolean
}

const Login = () => {
  const [loading, setLoading] = React.useState(false)
  const [cachedUser, setCachedUser] = React.useState('')

  React.useEffect(() => {
    setCachedUser(actions.getCacheLogin())
  }, [cachedUser])

  const resetCache = () => {
    actions.clearCache()
    setCachedUser('')
  }

  const handleSignIn = (data: ILoginFormData) => {
    setLoading(true)
    if (!data.username || !data.password) {
      actions.pushNotification({
        type: NOTIFICATION_STATES.ERROR,
        message: ERRORS.INVALID_LOGIN,
      })
      return setLoading(false)
    }

    actions
      .signIn(data.username, data.password)
      .then(() => {
        setLoading(false)
        if (data.rememberPassword) actions.cacheLogin(data.username)
        actions.pushNotification({
          type: NOTIFICATION_STATES.SUCCESS,
          message: SUCCESS.SUCCESS_LOGIN,
        })
      })
      .catch(err => {
        setLoading(false)
        actions.pushNotification({
          type: NOTIFICATION_STATES.ERROR,
          message: ERRORS[err.code] || ERRORS['LOGIN_FAILED'],
        })
      })
  }

  return (
    <Container>
      <FormWrapper>
        <LoginForm
          resetCache={resetCache}
          cachedUser={cachedUser}
          loading={loading}
          onSubmit={handleSignIn}
        />
      </FormWrapper>
    </Container>
  )
}

Login.getInitialProps = (ctx: any) => {
  if (auth.isTokenValid(ctx)) {
    ctx.res.writeHead(303, { Location: ROUTES.dashboard })
    ctx.res.end()
  }

  return { session: ctx[COOKIE.token] }
}

export default observer(Login)
