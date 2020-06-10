const fs = require('fs')

/**
 * @description Will check each file to determine whether and console logs
 * have been left.
 */
module.exports = ({ callback, created, modified }) => {
  const FILES = [...created, ...modified]

  FILES.forEach(file => {
    console.log({ file })
    const content = fs.readFileSync(file).toString()

    if (content.includes('console.')) {
      callback(`\`console.*\` log is present in (${file})`)
    }
  })
}
