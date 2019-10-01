import { IReview, IReviewUpdate } from '@vown/types'
import { authInit } from '@vown/auth'

const firebase = authInit

export const createReview = async (
  review: IReview
): Promise<{ reviews: IReview[]; user_id: string }> => {
  const reviewCreate = firebase.functions().httpsCallable('reviews-v1-create')
  const { data } = await reviewCreate(review)
  return data
}

export const updateReview = async (
  review: IReviewUpdate
): Promise<{ reviews: IReview[]; user_id: string }> => {
  const reviewUpdate = firebase.functions().httpsCallable('reviews-v1-update')
  const { data } = await reviewUpdate(review)
  return data
}

export const retrieveReview = {
  landlord: async (
    landlord_id: string,
    limit?: number
  ): Promise<{ reviews: IReview[]; landlord_id: string }> => {
    const reviewLandlord = firebase.functions().httpsCallable('reviews-v1-retrieve-landlord')
    const { data } = await reviewLandlord({ landlord_id, limit })
    return data
  },
  user: async (limit?: number): Promise<{ reviews: IReview[]; user_id: string }> => {
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
