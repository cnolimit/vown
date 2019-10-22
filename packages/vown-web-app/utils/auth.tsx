import React from 'react'
import nextCookie from 'next-cookies'
import { ROUTES, COOKIE, TOKEN } from './constants'
import jwt from 'jsonwebtoken'
import cookie from 'js-cookie'

export const auth = (ctx: any) => nextCookie(ctx).token

export const isTokenValid = (ctx: any) => {
  const token = auth(ctx)
  try {
    return token ? jwt.verify(token, TOKEN.secret) : false
  } catch (error) {
    return false
  }
}

export const redirect = (ctx: any, path: ROUTES) => {
  if (ctx.res) {
    ctx.res.writeHead(302, { Location: path })
    ctx.res.end()
  } else {
    document.location.pathname = path
  }
}

export const withAuth = (WrappedComponent: any) => {
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
