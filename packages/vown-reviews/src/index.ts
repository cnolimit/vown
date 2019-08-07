import axios from 'axios'
import { IReview } from '@vown/types'

const reviewsApi = axios.create({
  baseURL: 'https://us-central1-veriown-reviews.cloudfunctions.net/api',
  timeout: 25000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

interface IReviewModule {
  create: (review: IReview, callback: (error: string | null, data?: object) => void) => void
}

enum IReviewErrors {
  MISSING_ARGUMENT = 'MISSING_ARGUMENT',
}

const Review: IReviewModule = {
  create: (review, callback) => {
    console.log('REVIEW DATA', { review })
    if (!review) return callback(IReviewErrors.MISSING_ARGUMENT)

    reviewsApi.post('/reviews', review).then(res => {
      callback(null, res.data)
    })
  },
}

export default Review
