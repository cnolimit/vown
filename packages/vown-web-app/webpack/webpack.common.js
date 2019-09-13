const CopyPlugin = require('copy-webpack-plugin')
const { filePaths, alias } = require('./constants')

module.exports = {
  entry: {
    app: filePaths.entryFile,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [new CopyPlugin([{ from: 'public', to: filePaths.buildFolder }])],
  output: {
    path: filePaths.buildFolder,
    filename: 'bundle.js',
  },
}
