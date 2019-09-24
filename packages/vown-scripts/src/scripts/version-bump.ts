#! /usr/bin/env node

import Versioning from '../utils/versioning'
import { IVersionsList } from '../types'

const chalk = require('chalk')
const path = require('path')

const versions: IVersionsList = require(path.join(__dirname, '../../../../', 'versions.json'))

const packageExists = (name: string) => versions.packages.filter(pkg => pkg.name === name).length
const errorMessage = (msg: string) =>
  console.error(chalk.red(`\n====== Error Message ======\n\n⛔  ${msg}\n`))
const succesMessage = (msg: string) =>
  console.error(chalk.green(`\n====== Successfuly Updated ======\n\n🏷️  ${msg}\n`))

const packageName: any = process.argv[2]
const bumpType: any = process.argv[3]

const reviewBump = () => {
  if (!packageName) return errorMessage('Missing package name: e.g @vown/auth')
  if (!bumpType) return errorMessage('Missing version upgrade type: (major | minor | patch)')

  if (packageExists(packageName)) {
    const versionBump = new Versioning(packageName)
    const newVersion = versionBump.generateNewVersion(bumpType.toUpperCase())

    versionBump.setVersion(newVersion)
    const newVersionList = versionBump.getVersionsList()

    console.dir(newVersionList)
    return succesMessage(`${packageName} - Current Version: ${newVersion}`)
  } else {
    return errorMessage('Package does not exist!')
  }
}

reviewBump()
