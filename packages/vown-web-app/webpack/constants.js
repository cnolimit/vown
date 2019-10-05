const path = require('path')

const filePaths = {
  entryFile: path.resolve(__dirname, '../src/index.tsx'),
  buildFolder: path.resolve(__dirname, '../dist'),
}

const alias = {
  '@components': path.join(__dirname + '/../src/components/'),
  '@assets': path.join(__dirname + '/../src/assets/'),
  '@store': path.join(__dirname + '/../src/store/'),
}

module.exports = {
  alias,
  filePaths,
}
