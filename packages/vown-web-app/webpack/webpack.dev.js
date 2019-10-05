const path = require('path')
const common = require('./webpack.common')
const merge = require('webpack-merge')

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    port: 3000,
  },
})
