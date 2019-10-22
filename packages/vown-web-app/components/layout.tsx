import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Head from 'next/head'

const Layout = ({ children }: { children: any }) => (
  <div>
    <Head>
      <title>Veriown - Official Website </title>
    </Head>
    <div>{children}</div>
    <CssBaseline />
  </div>
)

export default Layout
