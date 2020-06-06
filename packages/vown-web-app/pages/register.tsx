import { RegistrationForm } from '@vown/components'
import { ERRORS, NOTIFICATION_STATES, SUCCESS } from '@vown/types'
import FormWrapper from 'components/form-wrapper'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
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

interface IRegistrationFormData {
  email: string
  username: string
  password: string
  rememberPassword: boolean
}

const Registration = () => {
  const [loading, setLoading] = useState(false)

  const handleSignInUp = (data: IRegistrationFormData) => {
    setLoading(true)

    actions
      .signUp(data.email, data.password, data.username)
      .then(() => {
        actions.pushNotification({
          type: NOTIFICATION_STATES.SUCCESS,
          message: SUCCESS.SUCCESS_CREATED_ACCOUNT,
        })
      })
      .catch((err: any) => {
        console.error({ err })
        actions.pushNotification({
          type: NOTIFICATION_STATES.ERROR,
          message: ERRORS.SIGN_UP_FAILED,
        })
        setLoading(false)
      })
  }

  return (
    <Container>
      <FormWrapper>
        <RegistrationForm onSubmit={handleSignInUp} loading={loading} />
      </FormWrapper>
    </Container>
  )
}

Registration.getInitialProps = (ctx: any) => {
  if (auth.isTokenValid(ctx)) {
    ctx.res.writeHead(303, { Location: ROUTES.dashboard })
    ctx.res.end()
  }

  return { session: ctx[COOKIE.token] }
}

export default observer(Registration)
