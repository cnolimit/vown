import {createReview, updateReview, retrieveReview} from '..'
import { authInit } from '@vown/auth'
import { IReview } from '@vown/types'

jest.mock('@vown/auth')

const landlordID = '9dd53577-b9aa-4024-beaa-1a38d3bba38b'
const userID = 'Zo27YeFFKkfTyf9wvV6Qe4dT5mf2'
const testReview = {
  recommends: true,
  landlord_id: '9dd53577-b9aa-4024-beaa-1a38d3bba38b',
  id: '84982455-17ba-49a5-b540-0844cd220bf0',
  title: 'Great Landlord',
  user_id: 'Zo27YeFFKkfTyf9wvV6Qe4dT5mf2',
  difficulty_rating: 2,
  experience_rating: 3,
  rating: 4,
  approve_of_landlord: true,
}

const landlord_reviews = {
  reviews: [testReview],
  landlord_id: landlordID,
}

const user_reviews = {
  reviews: [testReview],
  user_id: userID,
}

const updated_user_reviews = {
  reviews: [{...testReview, title: "Test update"}],
  user_id: userID,
}

//@ts-ignore
authInit.functions = jest.fn(() => {
  return {
    httpsCallable: jest.fn((name: string) => {
      switch (name) {
        case "reviews-v1-create":
          return () => ({ data: user_reviews })
        case "reviews-v1-update":
          return (review: IReview) => ({ data: {...user_reviews, reviews: [{...testReview, ...review}]} })
        case "reviews-v1-retrieve-landlord":
          return (options: {landlord_id: string, limit?: number}) => ({ data: {...landlord_reviews, landlord_id: options.landlord_id } })
        case "reviews-v1-retrieve-user":
          return () => ({ data: user_reviews })
        default:
        return null
      }
    })
  }
})

describe("Testing reviews functionality", () => {
  it("Should create a new review and return array of reviews", () => {
    createReview(testReview).then((res) => {
      expect(res).toEqual(user_reviews)
    })
  })
  it("Should update a review and return array of reviews", () => {
    updateReview({...testReview, title: "Test update"}).then((res) => {
      expect(res).toEqual(updated_user_reviews)
    })
  })
  it("Should retrieve all landlord reviews", () => {
    retrieveReview.landlord(landlordID).then((res) => {
      expect(res).toEqual(landlord_reviews)
    })
  })
  it("Should retrieve all user reviews", () => {
    retrieveReview.user().then((res) => {
      expect(res).toEqual(user_reviews)
    })
  })
})
