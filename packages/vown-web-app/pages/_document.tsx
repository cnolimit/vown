import { ServerStyleSheets } from '@material-ui/styles'
import * as Sentry from '@sentry/browser'
import Document, { Head, Main, NextScript } from 'next/document'
import * as React from 'react'
import { ServerStyleSheet } from 'styled-components'

process.on('unhandledRejection', err => {
  Sentry.captureException(err)
})

process.on('uncaughtException', err => {
  Sentry.captureException(err)
})

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const styledComponentsSheet = new ServerStyleSheet()
    const materialSheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) =>
            styledComponentsSheet.collectStyles(materialSheets.collect(<App {...props} />)),
        })
      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <React.Fragment>
            {initialProps.styles}
            {materialSheets.getStyleElement()}
            {styledComponentsSheet.getStyleElement()}
          </React.Fragment>
        ),
      }
    } finally {
      styledComponentsSheet.seal()
    }
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <link rel="shortcut icon" href="static/logo.png" />
          <link
            href={'https://fonts.googleapis.com/css?family=Nunito+Sans:400,600,700&display=swap'}
            rel="stylesheet"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="robots" content="noindex" />
          <meta name="description" content="Rental - Digital renting platform" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default MyDocument
