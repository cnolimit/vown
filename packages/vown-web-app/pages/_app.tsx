import { ThemeProvider } from '@material-ui/styles'
import Layout from 'components/layouts/base-layout'
import App from 'next/app'
import React from 'react'
import theme from 'utils/theme'

class MyApp extends App {
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
          <Component {...pageProps} key={router.route} />
        </ThemeProvider>
      </Layout>
    )
  }
}

export default MyApp
