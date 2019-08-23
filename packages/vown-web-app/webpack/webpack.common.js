const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/index.tsx'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@components': path.join(__dirname + '/../src/components/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new CopyPlugin([{ from: 'public', to: path.resolve(__dirname, '../dist') }])],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
  },
}
