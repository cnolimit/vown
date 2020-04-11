const path = require('path')
const withTM = require('next-transpile-modules')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(
  withTM({
    target: 'serverless',
    transpileModules: ['@vown/auth', '@vown/components', '@vown/reviews', '@vown/types'],
    webpack: config => {
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
