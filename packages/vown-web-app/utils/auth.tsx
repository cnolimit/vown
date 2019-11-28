import cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import nextCookie from 'next-cookies'
import React from 'react'
import { COOKIE, ROUTES, TOKEN } from '../types'

const auth = (ctx: any) => nextCookie(ctx).token

const isTokenValid = (ctx: any) => {
  const token = auth(ctx)
  try {
    return token ? jwt.verify(token, TOKEN.secret) : false
  } catch (error) {
    return false
  }
}

const redirect = (ctx: any, path: ROUTES) => {
  if (ctx.res) {
    ctx.res.writeHead(302, { Location: path })
    ctx.res.end()
  } else {
    document.location.pathname = path
  }
}

const withAuth = (WrappedComponent: any) => {
  class Wrapper extends React.Component<{ token: string }> {
    static getInitialProps(ctx: any) {
      const token = auth(ctx)
      const validToken = isTokenValid(ctx)

      if (!validToken) {
        ctx[COOKIE.token] = null
        cookie.set(COOKIE.token, COOKIE.delete_date)
        redirect(ctx, ROUTES.login)
      }

      if (validToken && token) {
        const decoded = jwt.decode(token)
        ctx[COOKIE.token] = decoded && decoded['data']
      }

      WrappedComponent.getInitialProps(ctx)
      return { session: ctx[COOKIE.token] }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return Wrapper
}

export default {
  withAuth,
  redirect,
  isTokenValid,
  auth,
}
