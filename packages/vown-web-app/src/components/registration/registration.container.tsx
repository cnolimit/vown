import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { RegistrationForm } from '@vown/components'
import { actions } from '@store/.'

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

  return <RegistrationForm onSubmit={handleSignIn} loading={loading} />
})

export default Registration
