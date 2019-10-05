import { action, observable } from 'mobx'
import { Auth } from '@vown/auth'

interface IStateObject {
  loggedIn: boolean
}

export const state = observable<IStateObject>({ loggedIn: Auth.isLoggedIn() })

export const actions = {
  setLoggedIn: action((status: boolean) => {
    state.loggedIn = status
  }),

  signIn: action((username: string, password: string) => {
    return Auth.SignIn(username, password).then(() => (state.loggedIn = true))
  }),

  signOut: action(() => {
    Auth.SignOut()
    state.loggedIn = false
  }),
}
