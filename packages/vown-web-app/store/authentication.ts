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
    Router.reload()
    clearTimeout(expireLogout)
  }, 15000)
  Router.replace(ROUTES.dashboard)
  Router.reload()
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

  signUp: action((username: string, password: string) => {
    return Auth.SignUp(username, password).then(() => loginAndSetState())
  }),

  signIn: action((username: string, password: string) => {
    return Auth.SignIn(username, password).then(() => loginAndSetState())
  }),

  signOut: action(() => {
    cookie.remove(COOKIE.token)
    state.loggedIn = false

    Auth.SignOut()
    Router.push(ROUTES.login)
  }),
}

export default authActions
