import React from 'react'
import App from 'next/app'
import theme from '../utils/theme'
import Layout from '../components/layout'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from '@material-ui/styles'

class MyApp extends App {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode!.removeChild(jssStyles)
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
