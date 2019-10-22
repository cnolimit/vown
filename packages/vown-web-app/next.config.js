const withTM = require('next-transpile-modules')

module.exports = withTM({
  transpileModules: ['@vown/auth', '@vown/components', '@vown/reviews'],
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@vown/auth': require.resolve('@vown/auth'),
      '@vown/components': require.resolve('@vown/components'),
      '@vown/reviews': require.resolve('@vown/reviews'),
    }
    return config
  },
})
