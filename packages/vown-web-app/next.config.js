const path = require('path')
const withTM = require('next-transpile-modules')
const withSourceMaps = require('@zeit/next-source-maps')()
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const SentryWebpackPlugin = require('@sentry/webpack-plugin')
const {
  NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
  SENTRY_ORG,
  SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN,
  NODE_ENV,
} = process.env

// process.env.SENTRY_DSN = SENTRY_DSN

module.exports = withBundleAnalyzer(
  withSourceMaps(
    withTM({
      env: {
        SENTRY_DSN: 'https://aa37d5076ba3407994b5fdb4d00252bd@o403587.ingest.sentry.io/5266426',
      },
      target: 'experimental-serverless-trace',
      transpileModules: ['@vown/auth', '@vown/components', '@vown/reviews', '@vown/types'],
      webpack: (config, options) => {
        // In `pages/_app.js`, Sentry is imported from @sentry/node. While
        // @sentry/browser will run in a Node.js environment, @sentry/node will use
        // Node.js-only APIs to catch even more unhandled exceptions.
        //
        // This works well when Next.js is SSRing your page on a server with
        // Node.js, but it is not what we want when your client-side bundle is being
        // executed by a browser.
        //
        // Luckily, Next.js will call this webpack function twice, once for the
        // server and once for the client. Read more:
        // https://nextjs.org/docs#customizing-webpack-config
        //
        // So ask Webpack to replace @sentry/node imports with @sentry/browser when
        // building the browser's bundle
        if (!options.isServer) {
          config.resolve.alias['@sentry/node'] = '@sentry/browser'
        }

        // When all the Sentry configuration env variables are available/configured
        // The Sentry webpack plugin gets pushed to the webpack plugins to build
        // and upload the source maps to sentry.
        // This is an alternative to manually uploading the source maps
        // Note: This is disabled in development mode.
        if (
          SENTRY_DSN &&
          SENTRY_ORG &&
          SENTRY_PROJECT &&
          SENTRY_AUTH_TOKEN &&
          NODE_ENV === 'production'
        ) {
          config.plugins.push(
            new SentryWebpackPlugin({
              include: '.next',
              ignore: ['node_modules'],
              urlPrefix: '~/_next',
              release: options.buildId,
            })
          )
        }

        config.resolve.alias = {
          ...config.resolve.alias,
          '@vown/auth': require.resolve('@vown/auth'),
          '@vown/components': require.resolve('@vown/components'),
          '@vown/reviews': require.resolve('@vown/reviews'),
          '@vown/types': require.resolve('@vown/types'),
          components: path.resolve(__dirname, 'components'),
          utils: path.resolve(__dirname, 'utils'),
          types: path.resolve(__dirname, 'types'),
          store: path.resolve(__dirname, 'store'),
          pages: path.resolve(__dirname, 'pages'),
          static: path.resolve(__dirname, 'static'),
        }

        config.module.rules.push(
          {
            test: /\.svg$/i,
            use: ['@svgr/webpack'],
          },
          {
            test: /\.(png|jpg|gif)$/i,
            use: ['url-loader'],
          }
        )

        return config
      },
    })
  )
)
