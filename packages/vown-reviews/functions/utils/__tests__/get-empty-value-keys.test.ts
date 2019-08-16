import { getEmptyValueKeys } from '..'

describe('Testing isInvalidBody function', () => {
  it('Should return true for missing property value', () => {
    const review = {
      title: '',
      difficulty_rating: 1,
      experience_rating: 1,
      approve_of_landlord: false,
      recommends: false,
      landlord_id: '',
      user_id: '',
      rating: 4,
    }
    expect(getEmptyValueKeys(review)).toEqual(['title', 'landlord_id', 'user_id'])
  })

  it('Should return false if all properties have values', () => {
    const review = {
      title: 'value',
      difficulty_rating: 1,
      experience_rating: 1,
      approve_of_landlord: false,
      recommends: false,
      landlord_id: 'value',
      user_id: 'value',
      rating: 4,
    }
    expect(getEmptyValueKeys(review)).toEqual([])
  })
})
