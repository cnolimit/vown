import { RegistrationForm } from '@vown/components'
import FormWrapper from 'components/form-wrapper'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { actions } from 'store'
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

interface IRegistrationFormData {
  email: string
  username: string
  password: string
  rememberPassword: boolean
}

const Registration = observer(() => {
  const [loading, setLoading] = useState(false)
  const handleSignInUp = (data: IRegistrationFormData) => {
    setLoading(true)
    actions.signUp(data.username, data.password).catch(() => {
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
})

export default Registration
