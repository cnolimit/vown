import { isInvalid } from '..'
import { createApi } from '../../api/v1/errors'

describe('Testing isValid function', () => {
  it('Should return an error for landlord id', () => {
    const details = [
      {
        code: 'INVALID_LANDLORD_ID',
        message: 'Invalid landlord id',
        target: 'landlord',
        key: 'landlord_id',
      },
    ]

    expect(isInvalid([{ key: 'landlord_id', exists: false }], createApi.Error404)).toEqual({
      ...createApi.Error404,
      details,
    })
  })

  it('Should return an error for user id', () => {
    const details = [
      {
        code: 'INVALID_USER_ID',
        message: 'Invalid user id',
        target: 'user',
        key: 'user_id',
      },
    ]

    expect(isInvalid([{ key: 'user_id', exists: false }], createApi.Error404)).toEqual({
      ...createApi.Error404,
      details,
    })
  })

  it('Should return an error for both user and landlord id', () => {
    const details = [
      {
        code: 'INVALID_LANDLORD_ID',
        message: 'Invalid landlord id',
        target: 'landlord',
        key: 'landlord_id',
      },
      {
        code: 'INVALID_USER_ID',
        message: 'Invalid user id',
        target: 'user',
        key: 'user_id',
      },
    ]

    expect(
      isInvalid(
        [{ key: 'user_id', exists: false }, { key: 'landlord_id', exists: false }],
        createApi.Error404
      )
    ).toEqual({ ...createApi.Error404, details })
  })

  it('Should return an error for user but not landlord', () => {
    const details = [
      {
        code: 'INVALID_USER_ID',
        message: 'Invalid user id',
        target: 'user',
        key: 'user_id',
      },
    ]

    expect(
      isInvalid(
        [{ key: 'user_id', exists: false }, { key: 'landlord_id', exists: true }],
        createApi.Error404
      )
    ).toEqual({ ...createApi.Error404, details })
  })

  it('Should return false if the user exists', () => {
    expect(isInvalid([{ key: 'user_id', exists: true }], createApi.Error404)).toEqual(false)
  })
})
