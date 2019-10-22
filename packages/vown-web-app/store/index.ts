import Router from 'next/router'
import { action, observable } from 'mobx'
import { Auth } from '@vown/auth'
import { IUserDetails } from '@vown/types'
import cookie from 'js-cookie'
import { ROUTES, COOKIE, TOKEN } from '../utils/constants'
import jwt from 'jsonwebtoken'

interface IStateObject {
  loggedIn: boolean
  user: IUserDetails | null | boolean
}

export const state = observable<IStateObject>({
  loggedIn: process.browser && Auth.isLoggedIn(),
  user: process.browser && Auth.GetPersonalDetails(),
})

export const actions = {
  setLoggedIn: action((status: boolean) => {
    state.loggedIn = status
  }),

  getPersonalDetails: action(() => {
    return process.browser && Auth.GetPersonalDetails()
  }),

  signIn: action((username: string, password: string) => {
    return Auth.SignIn(username, password).then(() => {
      state.loggedIn = true
      state.user = Auth.GetPersonalDetails()
      const token = jwt.sign({ data: state.user }, TOKEN.secret, { expiresIn: '1m' })

      if (state.user && typeof state.user === 'object') {
        cookie.set(COOKIE.token, token, { expires: 1 })
      }

      Router.replace(ROUTES.dashboard)
      Router.reload()
    })
  }),

  signOut: action(() => {
    cookie.remove(COOKIE.token)
    state.loggedIn = false

    Auth.SignOut()
    Router.push(ROUTES.login)
  }),
}
