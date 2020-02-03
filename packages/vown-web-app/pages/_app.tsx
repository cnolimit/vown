import { ThemeProvider } from '@material-ui/styles'
import { AnimatePresence } from 'framer-motion'
import App from 'next/app'
import React from 'react'
import Layout from '../components/layout/base-layout'
import theme from '../utils/theme'

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
          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </ThemeProvider>
      </Layout>
    )
  }
}

export default MyApp
