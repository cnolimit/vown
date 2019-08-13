import { isInvalidBody } from '.'
import { createError422 } from '../api/v1/errors/create-errors'

describe('Testing isInvalidBody function', () => {
  it('Should return all errors if an empty review is provided', () => {
    expect(isInvalidBody({}, createError422)).toEqual({
      ...createError422,
      details: [...Object.values(createError422.details)],
    })
  })

  it('Should return no errors if all the required properties are present', () => {
    const review = {
      title: 'Great Landlord',
      difficulty_rating: '2',
      experience_rating: '3',
      approve_of_landlord: true,
      recommends: true,
      rating: '2',
      landlord_id: '9dd53577-b9aa-4024-beaa-1a38d3bba38b',
      user_id: 'p3c56afb7-8336-44f4-b784-6ecb72a14d31',
    }

    expect(isInvalidBody(review, createError422)).toEqual(false)
  })
})
