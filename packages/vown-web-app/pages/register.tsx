import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { RegistrationForm } from '@vown/components'
import { actions } from '../store'
import styled from 'styled-components'

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
