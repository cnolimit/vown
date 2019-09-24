import VersionBump from '../utils/versioning'
import { IVersionsList } from '../types'
const fs = require('fs')

jest.mock('fs')

const versions: IVersionsList = require('./data/versions.json')
const authPackageName = '@vown/auth'
let versionBump = new VersionBump(authPackageName)

//@ts-ignore
versionBump._getVersionsFile = jest.fn(() => __dirname + '/data/versions.json')
const authPackageVersion = versions.packages.filter(pkg => pkg.name === authPackageName)[0]

describe('Testing - Version Bump Functionality', () => {
  beforeAll(() => {
    //@ts-ignore
    fs.writeFile.mockResolvedValue()
  })
  it('Should return the correct package name', () => {
    expect(versionBump.getPackageVersion().name).toEqual(authPackageName)
  })
  it('Should return the correct package version', () => {
    expect(versionBump.getPackageVersion().current).toEqual(authPackageVersion.current)
  })
  it('Should update previous and current verisions', () => {
    const expected = { previous: '2.0.0', current: '3.0.0' }
    versionBump.setVersion('3.0.0')

    expect(versionBump.getPackageVersion().current).toEqual(expected.current)
    expect(versionBump.getPackageVersion().previous).toEqual(expected.previous)
  })
  it('Should throw error if update fails', () => {
    expect(
      //@ts-ignore
      fs.writeFile.mockImplementation((file: string, data: any, callback: any) => {
        callback(true)
      })
    ).toThrow()
  })

  describe('Testing - MAJOR | MINOR | PATCH bump', () => {
    const componentsPackageName = '@vown/components'
    const vBump = new VersionBump(componentsPackageName)
    vBump._getVersionsFile = jest.fn(() => __dirname + '/data/versions.json')

    it('Should update major version', () => {
      expect(vBump.generateNewVersion('MAJOR')).toEqual('3.0.0')
    })
    it('Should update minor version', () => {
      expect(vBump.generateNewVersion('MINOR')).toEqual('2.1.0')
    })
    it('Should update patch version', () => {
      expect(vBump.generateNewVersion('PATCH')).toEqual('2.0.1')
    })
    it('Should return current version if tyoe isnt passed', () => {
      //@ts-ignore
      expect(vBump.generateNewVersion()).toEqual('2.0.0')
    })
  })
})
