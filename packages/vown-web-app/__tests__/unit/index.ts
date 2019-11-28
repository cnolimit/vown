/* eslint-disable */
import { truncateMiddle } from '../../utils/helpers'

const string1 = 'oluwashindara oreoluwa'
const string1_e = 'oluwas...eoluwa'

const string2 = 'phillip akuamoa'
const string2_e = 'phillip akuamoa'

const string3 = 'phillip akuamoah'
const string3_e = 'philli...uamoah'

const string4 = '7710791601834032404608975024239219384945778571688397343347624559077651'
const string4_e = '7710791601834032404608975024239219384945778571688397343347624559077651'

const string6 =
  '7710791601834032404608975024239219384945778571688397343347624559077651+7710791601834032404608975024239219384945778571688397343347624559077651'
const string6_e = '771079160183403240460897502423921...945778571688397343347624559077651'


describe('Testing - Truncating the string', () => {
  test(`Should return ${string1_e} when the string is greater than 15 chars\n`, () => {
    expect(truncateMiddle(string1, 15)).toBe(string1_e)
    expect(truncateMiddle(string1, 15).length).toBeLessThanOrEqual(15)
  })
  test(`Should return ${string2_e} when the string is 15 chars\n`, () => {
    expect(truncateMiddle(string2, 15)).toBe(string2_e)
    expect(truncateMiddle(string2, 15).length).toBeLessThanOrEqual(15)
  })
  test(`Should return ${string3_e} when the string is 16 chars\n`, () => {
    expect(truncateMiddle(string3, 15)).toBe(string3_e)
    expect(truncateMiddle(string3, 15).length).toBeLessThanOrEqual(15)
  })
  test(`Should return ${string4_e} when the string is 70 chars\n`, () => {
    expect(truncateMiddle(string4, 70)).toBe(string4_e)
    expect(truncateMiddle(string4, 70).length).toBeLessThanOrEqual(70)
  })
  test(`Should return ${string6_e} when the string is crazzy greater than 70 chars\n`, () => {
    expect(truncateMiddle(string6, 70)).toBe(string6_e)
    expect(truncateMiddle(string6, 70).length).toBeLessThanOrEqual(70)
  })
})
