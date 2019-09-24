export interface IVersion {
  name: string
  current: string
  previous: string
  lastUpdated: string
}

export interface IVersionsList {
  packages: IVersion[]
}

export type VersionType = 'MAJOR' | 'MINOR' | 'PATCH'
