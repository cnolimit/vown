import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import * as Sentry from '@sentry/browser'
import Layout from 'components/layouts/base-layout'
import App from 'next/app'
import React from 'react'
import theme from 'utils/theme'

Sentry.init({
  release: process.env.release,
  dsn: process.env.SENTRY_DSN,
  environment: process.env.SENTRY_ENV || process.env.NODE_ENV,
})

class MyApp extends App {
  componentDidCatch(error: any, errorInfo: React.ErrorInfo) {
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key])
      })

      Sentry.captureException(error)
    })

    super.componentDidCatch(error, errorInfo)
  }

  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      if (jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles)
      }
    }
  }

  render() {
    const { Component, pageProps, router } = this.props

    return (
      <Layout>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} key={router.route} />
        </ThemeProvider>
      </Layout>
    )
  }
}

export default MyApp
