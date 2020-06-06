import { Auth } from '@vown/auth'
import cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import { action } from 'mobx'
import Router from 'next/router'
import { COOKIE, ROUTES, TOKEN } from 'types'
import state from './state'

const loginAndSetState = () => {
  state.loggedIn = true
  state.user = Auth.GetPersonalDetails()
  const token = jwt.sign({ data: state.user }, TOKEN.secret, { expiresIn: '15m' })

  if (state.user && typeof state.user === 'object') {
    cookie.set(COOKIE.token, token, { expires: 1 })
  }
  const expireLogout = setTimeout(() => {
    clearTimeout(expireLogout)
  }, 15000)

  Router.replace(ROUTES.dashboard)
}

const authActions = {
  setLoggedIn: action((status: boolean) => {
    state.loggedIn = status
  }),

  cacheLogin: action((email: string) => {
    localStorage.setItem('email', email)
  }),

  clearCache: action(() => {
    localStorage.setItem('email', '')
  }),

  getCacheLogin: action(() => {
    return localStorage.getItem('email') || ''
  }),

  getPersonalDetails: action(() => {
    return process.browser && Auth.GetPersonalDetails()
  }),

  signUp: action((email: string, password: string, username: string) => {
    return Auth.SignUp(email, password, username).then(() => loginAndSetState())
  }),

  signIn: action((email: string, password: string) => {
    return Auth.SignIn(email, password).then(() => loginAndSetState())
  }),

  signOut: action(() => {
    cookie.remove(COOKIE.token)
    state.loggedIn = false

    Auth.SignOut()
    Router.push(ROUTES.login)
  }),
}

export default authActions
