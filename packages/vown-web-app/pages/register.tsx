import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { RegistrationForm } from '@vown/components'
import { actions } from '../store'
import FormWrapper from '../components/form-wrapper'
import styled from 'styled-components'

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
  email: string
  username: string
  password: string
  rememberPassword: boolean
}

const Registration = observer(() => {
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
        <RegistrationForm onSubmit={handleSignIn} loading={loading} />
      </FormWrapper>
    </Container>
  )
})

export default Registration
