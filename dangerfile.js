const { danger, fail, warn } = require('danger')
const { warnings, fails } = require('./internals/danger')
const { getIncludedPaths, removeIgnoredPaths } = require('./internals/danger/utils')
const { INCLUDE_LIST, IGNORE_LIST } = require('./internals/danger/constants')

const MODIFIED_FILES = removeIgnoredPaths(
  getIncludedPaths(danger.git.modified_files, INCLUDE_LIST),
  IGNORE_LIST
)
const CREATED_FILES = removeIgnoredPaths(
  getIncludedPaths(danger.git.created_files, INCLUDE_LIST),
  IGNORE_LIST
)

const getArguments = callback => ({ callback, modified: MODIFIED_FILES, created: CREATED_FILES })

warnings.forEach(rule => rule(getArguments(warn)))
fails.forEach(rule => rule(getArguments(fail)))

// const fs = require('fs')
// const { execSync } = require('child_process')
// const versions = require('./versions.json')
// const PR = danger.github.pr
// const MODIFIED_FILES = danger.git.modified_files
// const CREATED_FILES = danger.git.created_files
// const FILES = [...MODIFIED_FILES, ...CREATED_FILES]
// const APP_FILES = FILES.filter(path => path.startsWith('packages'))
// const TS_FILES = [...APP_FILES]
// const IGNORE_LIST = ['vown-scripts']

// // const packagesUpdatedManually = []
// // const packagesToUpgrade = []
// // const DIFF_COMMAND = 'git diff origin/develop -- '

// // FILES.forEach(async file => {
// //   // Check if the package.json file have been edited manually
// //   if (file.includes('/package.json')) {
// //     const packageNameAlias = `@${file.split('/')[1].replace('-', '/')}`
// //     const version = versions.packages.filter(pkg => pkg.name === packageNameAlias)[0]
// //     const packageVersion = require(`./${file}`).version
// //     const hasBeenDowngraded = () => {
// //       const packageInt = parseInt(packageVersion.replace('.', ''))
// //       if (packageInt < parseInt(version.current.replace('.', ''))) return true
// //       if (packageInt < parseInt(version.previous.replace('.', ''))) return true
// //     }

// //     if (
// //       (!packagesUpdatedManually.includes(file) &&
// //         version.current !== packageVersion &&
// //         version.previous !== packageVersion) ||
// //       hasBeenDowngraded()
// //     ) {
// //       packagesUpdatedManually.push(file)
// //     }
// //   }
// // })

// // MODIFIED_FILES.forEach(file => {
// //   // Check if any modified packages have not been upgraded.
// //   if (file.includes('/vown-')) {
// //     const modifiedPackage = file
// //       .split('packages/')
// //       .join('')
// //       .split('/')[0]
// //     const packageNameAlias = `@${modifiedPackage.replace('-', '/')}`
// //     const version = versions.packages.filter(pkg => pkg.name === packageNameAlias)[0]
// //     const packageJsonPath = `${version.path}/package.json`

// //     const hasUpdatedPackageJSON = FILES.includes(packageJsonPath)
// //     if (!hasUpdatedPackageJSON && !packagesToUpgrade.includes(modifiedPackage)) {
// //       return packagesToUpgrade.push(modifiedPackage)
// //     }

// //     const packageJsonDiff = execSync(`${DIFF_COMMAND}${packageJsonPath}`, { stdio: 'pipe' })
// //     const diffMatch = packageJsonDiff && packageJsonDiff.toString().match(/"version":/g)

// //     if (
// //       !!packageJsonDiff &&
// //       diffMatch &&
// //       diffMatch.length !== 2 &&
// //       !packagesToUpgrade.includes(modifiedPackage)
// //     ) {
// //       return packagesToUpgrade.push(modifiedPackage)
// //     }
// //   }
// // })

// // // Any packages that have been modified need to be updated
// // if (packagesToUpgrade.length) {
// //   fail(`
// // **Package version needs to be updated in:**\n
// // ${packagesToUpgrade.map(pkg => `packages/${pkg}/package.json`).join('\n')}
// // \nRun the command:
// // \`\`\`
// // yarn bump-version
// // \`\`\`
// // `)
// // }

// // // Any packages that have been manually updated need to be reverted
// // // and processed by the version-bump script
// // if (packagesUpdatedManually.length) {
// //   fail(`
// // **Package version has been updated manually in:**\n
// // ${packagesUpdatedManually.join('\n')}
// // \nRun the command:
// // \`\`\`
// // yarn bump-version
// // \`\`\`
// // `)
// // }

//     if (
//       (!packagesUpdatedManually.includes(file) &&
//         version.current !== packageVersion &&
//         version.previous !== packageVersion) ||
//       hasBeenDowngraded()
//     ) {
//       packagesUpdatedManually.push(file)
//     }
//   }
// })

// MODIFIED_FILES.forEach(file => {
//   // Check if any modified packages have not been upgraded.
//   if (file.includes('/vown-')) {
//     const modifiedPackage = file
//       .split('packages/')
//       .join('')
//       .split('/')[0]
//     const packageNameAlias = `@${modifiedPackage.replace('-', '/')}`
//     const version = versions.packages.filter(pkg => pkg.name === packageNameAlias)[0]
//     const packageJsonPath = `${version.path}/package.json`

//     const hasUpdatedPackageJSON = FILES.includes(packageJsonPath)
//     if (!hasUpdatedPackageJSON && !packagesToUpgrade.includes(modifiedPackage)) {
//       return packagesToUpgrade.push(modifiedPackage)
//     }

//     const packageJsonDiff = execSync(`${DIFF_COMMAND}${packageJsonPath}`, { stdio: 'pipe' })
//     const diffMatch = packageJsonDiff && packageJsonDiff.toString().match(/"version":/g)

//     if (
//       !!packageJsonDiff &&
//       diffMatch &&
//       diffMatch.length !== 2 &&
//       !packagesToUpgrade.includes(modifiedPackage)
//     ) {
//       return packagesToUpgrade.push(modifiedPackage)
//     }
//   }
// })

// // Any packages that have been modified need to be updated
// if (packagesToUpgrade.length) {
//   fail(`
// **Package version needs to be updated in:**\n
// ${packagesToUpgrade.map(pkg => `packages/${pkg}/package.json`).join('\n')}
// \nRun the command:
// \`\`\`
// yarn bump-version
// \`\`\`
// `)
// }

// // Any packages that have been manually updated need to be reverted
// // and processed by the version-bump script
// if (packagesUpdatedManually.length) {
//   fail(`
// **Package version has been updated manually in:**\n
// ${packagesUpdatedManually.join('\n')}
// \nRun the command:
// \`\`\`
// yarn bump-version
// \`\`\`
// `)
// }

// // -- PR into master branch -------------------------------------------------------------- //
// if (PR.base.ref === 'master') {
//   // PR description has no issue refference that is being closed
//   if (!PR.body.includes('closes #')) {
//     fail('PR description should include issue refference being closed. e.g closes #')
//   }

//   // -- TS_FILES checks ------------------------------------------------------------------ //
//   TS_FILES.forEach(file => {
//     const content = fs.readFileSync(file).toString()
//     const ignore = IGNORE_LIST.filter(folder => file.includes(folder)).length

//     // Check for TODO comment
//     if (content.includes('TODO')) fail(`\`TODO\` comment is present in (${file})`)

//     if (!file.includes('test')) {
//       // Check for tslint:disable comment
//       if (content.includes('tslint:disable')) {
//         warn(`\`tslint:disable\` comment is present in (${file})`)
//       }

//       // Check for @tslint-ignore comment
//       if (content.includes('@ts-ignore')) {
//         warn(`\`@ts-ignore\` comment is present in (${file})`)
//       }

//       // Check for console.* logs
//       if (!ignore && content.includes('console.')) fail(`\`console.*\` log is present in (${file})`)
//     }
//   })
// }
