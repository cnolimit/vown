const { danger, fail, message, warn } = require('danger')
const fs = require('fs')
const path = require('path')
const PR = danger.github.pr
const MODIFIED_FILES = danger.git.modified_files
const CREATED_FILES = danger.git.created_files
const FILES = [...MODIFIED_FILES, ...CREATED_FILES]
const APP_FILES = FILES.filter(path => path.startsWith('packages'))
const TS_FILES = [...APP_FILES]

// -- PR into master branch -------------------------------------------------------------- //
if (PR.base.ref === 'master') {
  // PR description has no issue refference that is being closed
  if (!PR.body.includes('closes #')) {
    fail('PR description should include issue refference being closed')
  }

  // -- TS_FILES checks ------------------------------------------------------------------ //
  TS_FILES.forEach(file => {
    const content = fs.readFileSync(file).toString()

    // Check for TODO comment
    if (content.includes('TODO')) fail(`\`TODO\` comment is present in (${file})`)

    if (!file.includes('test')) {
      // Check for tslint:disable comment
      if (content.includes('tslint:disable')) {
        warn(`\`tslint:disable\` comment is present in (${file})`)
      }

      // Check for @tslint-ignore comment
      if (content.includes('@ts-ignore')) {
        warn(`\`@ts-ignore\` comment is present in (${file})`)
      }

      // Check for console.* logs
      if (content.includes('console.')) fail(`\`console.*\` log is present in (${file})`)
    }
  })
}
