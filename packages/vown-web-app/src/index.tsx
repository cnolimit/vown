import React from 'react'
import * as ReactDOM from 'react-dom'
// import ReviewContainer from '@components/reviews/reviews.container'
import auth from '@vown/auth'

const signIn = async () => {
  const session = await auth.SignIn('cnolimit@gmail.com', 'pass123').catch(err => {
    console.log({ err })
  })
  console.log({ session })
  return session
}

const signUp = async () => {
  const session = await auth.SignUp('cnolimit@gmail.com', 'pass123')
  console.log({ session })
  return session
}

const getUserDetails = async () => {
  const user = await auth.GetPersonalDetails()
  console.log({ user })
  return user
}

const getToken = async () => {
  const token = await auth.GetToken()
  console.log({ token })
  return token
}

const signOut = async () => await auth.SignOut()

const App = () => {
  return (
    <React.Fragment>
      <div>
        <button onClick={signIn}>Sign In</button>
        <button onClick={signUp}>Sign Up</button>
        <button onClick={signOut}>Sign Out</button>
        <button onClick={getUserDetails}>Get User Details</button>
        <button onClick={getToken}>Get User TOKEN</button>
      </div>
      {/* <ReviewContainer /> */}
    </React.Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
