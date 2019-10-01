import { IVersionsList, VersionType } from '../types'
const fs = require('fs')
const path = require('path')

class Versions {
  packageName: string

  constructor(packageName: string) {
    this.packageName = packageName
    this._stabiliseVersions()
  }

  _saveToFile(data: object, file: string) {
    const dataUint = new Uint8Array(Buffer.from(JSON.stringify(data)))
    return fs.writeFile(file, dataUint, (err: any) => {
      if (err) throw err
      return this.getVersionsList()
    })
  }

  _stabiliseVersions() {
    const list = this.getVersionsList().packages.map(pkg => {
      pkg.current = require(path.join(
        __dirname + `../../../../../${pkg.path}/package.json`
      )).version
      pkg.lastUpdated = new Date().toISOString()
      return pkg
    })
    this._saveToFile(list, this._getVersionsFile())
  }

  _getVersionsFile() {
    return path.join(__dirname, '../../../../', 'versions.json')
  }

  getVersionsList() {
    return require(this._getVersionsFile()) as IVersionsList
  }

  getPackageVersion() {
    return this.getVersionsList().packages.filter(pkg => pkg.name === this.packageName)[0]
  }

  generateNewVersion(type: VersionType) {
    let [Major, Minor, Patch] = this.getPackageVersion().current.split('.')
    if (type === 'MAJOR') {
      Major = (parseInt(Major) + 1).toString()
      Minor = '0'
      Patch = '0'
    }
    if (type === 'MINOR') {
      Minor = (parseInt(Minor) + 1).toString()
      Patch = '0'
    }
    if (type === 'PATCH') {
      Patch = (parseInt(Patch) + 1).toString()
    }

    return `${Major}.${Minor}.${Patch}`
  }

  setVersion(newVersion: string) {
    const packageDetails = this.getPackageVersion()
    const packageJsonFilePath = path.join(
      __dirname + `../../../../../${packageDetails.path}/package.json`
    )
    const packageJson = require(packageJsonFilePath)

    packageDetails.previous = packageDetails.current
    packageDetails.current = newVersion
    packageDetails.lastUpdated = new Date().toISOString()

    this._saveToFile(this.getVersionsList(), this._getVersionsFile())
    this._saveToFile({ ...packageJson, version: newVersion }, packageJsonFilePath)
  }
}

export default Versions
