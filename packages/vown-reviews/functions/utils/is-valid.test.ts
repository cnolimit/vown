import { isInvalid } from '.'
import { createError404 } from '../api/v1/errors/create-errors'

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

    expect(isInvalid([{ key: 'landlord_id', exists: false }], createError404)).toEqual({
      ...createError404,
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

    expect(isInvalid([{ key: 'user_id', exists: false }], createError404)).toEqual({
      ...createError404,
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
        createError404
      )
    ).toEqual({ ...createError404, details })
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
        createError404
      )
    ).toEqual({ ...createError404, details })
  })

  it('Should return false if the user exists', () => {
    expect(isInvalid([{ key: 'user_id', exists: true }], createError404)).toEqual(false)
  })
})
