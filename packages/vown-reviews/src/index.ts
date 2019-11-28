import { authInit } from '@vown/auth'
import { ERRORS, IReview, IReviewObject, IReviewUpdate } from '@vown/types'

const firebase = authInit
interface IReviewResponse {
  reviews: IReviewObject[]
  error?: IReviewResponseError & {
    details: (IReviewResponseError & { key: string })[]
  }
}
interface IReviewResponseError {
  code: ERRORS
  message: string
  target: string
}

export const createReview = async (
  review: IReview
): Promise<IReviewResponse & { user_id: string }> => {
  const reviewCreate = firebase.functions().httpsCallable('reviews-v1-create')
  const { data } = await reviewCreate(review)
  return data
}

export const updateReview = async (
  review: IReviewUpdate
): Promise<IReviewResponse & { user_id: string }> => {
  const reviewUpdate = firebase.functions().httpsCallable('reviews-v1-update')
  const { data } = await reviewUpdate(review)
  return data
}

export const retrieveReview = {
  landlord: async (
    landlord_id: string,
    limit?: number
  ): Promise<IReviewResponse & { landlord_id: string }> => {
    const reviewLandlord = firebase.functions().httpsCallable('reviews-v1-retrieve-landlord')
    const { data } = await reviewLandlord({ landlord_id, limit })
    return data
  },
  user: async (limit?: number): Promise<IReviewResponse & { user_id: string }> => {
    const reviewUser = firebase.functions().httpsCallable('reviews-v1-retrieve-user')
    const { data } = await reviewUser({ limit })
    return data
  },
}

export default {
  create: createReview,
  update: updateReview,
  retrieve: retrieveReview,
}
