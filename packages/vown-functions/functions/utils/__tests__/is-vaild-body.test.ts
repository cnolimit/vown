import { isInvalidBody } from '..'
import { createApi } from '../../api/v1/errors'

describe('Testing isInvalidBody function', () => {
  it('Should return all errors if an empty review is provided', () => {
    expect(isInvalidBody({}, createApi.Error422)).toEqual({
      ...createApi.Error422,
      details: [...Object.values(createApi.Error422.details)],
    })
  })

  it('Should return no errors if all the required properties are present', () => {
    const review = {
      title: 'Great Landlord',
      difficulty_rating: 2,
      experience_rating: 3,
      approve_of_landlord: true,
      recommends: true,
      rating: 2,
      landlord_id: '9dd53577-b9aa-4024-beaa-1a38d3bba38b',
      user_id: 'p3c56afb7-8336-44f4-b784-6ecb72a14d31',
    }

    expect(isInvalidBody(review, createApi.Error422)).toEqual(false)
  })

  it('Should return no errors if the boolean values are false', () => {
    const review = {
      title: 'Great Landlord',
      difficulty_rating: 2,
      experience_rating: 3,
      approve_of_landlord: false,
      recommends: false,
      rating: 2,
      landlord_id: '9dd53577-b9aa-4024-beaa-1a38d3bba38b',
      user_id: 'p3c56afb7-8336-44f4-b784-6ecb72a14d31',
    }

    expect(isInvalidBody(review, createApi.Error422)).toEqual(false)
  })

  it('Should return no errors if the numerica values are 0', () => {
    const review = {
      title: 'Great Landlord',
      difficulty_rating: 2,
      experience_rating: 2,
      approve_of_landlord: true,
      recommends: true,
      rating: 0,
      landlord_id: '9dd53577-b9aa-4024-beaa-1a38d3bba38b',
      user_id: 'p3c56afb7-8336-44f4-b784-6ecb72a14d31',
    }

    expect(isInvalidBody(review, createApi.Error422)).toEqual(false)
  })
})
