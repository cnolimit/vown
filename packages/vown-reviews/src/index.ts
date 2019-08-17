import axios, { AxiosResponse } from 'axios'
import { IReview, IReviewUpdate } from '@vown/types'

type Callback = (error: string | null, data?: object) => void

interface IReviewModule {
  create: (review: IReview, callback: Callback) => void
  update: (review: IReviewUpdate, callback: Callback) => void
  retrieve: {
    landlord: (id: string, callback: Callback) => void
    user: (id: string, callback: Callback) => void
  }
}

const version = 'v1'
const host = 'https://us-central1-veriown-reviews.cloudfunctions.net/api/reviews'

const reviewsApi = axios.create({
  baseURL: `${host}/${version}`,
  timeout: 25000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

const Review: IReviewModule = {
  create: (review, callback) => {
    reviewsApi
      .post('/create', review)
      .then(res => callback(null, res.data))
      .catch((res: AxiosResponse) => callback(res.data))
  },
  update: (review, callback) => {
    reviewsApi
      .put('/update', review)
      .then(res => callback(null, res.data))
      .catch((res: AxiosResponse) => callback(res.data))
  },
  retrieve: {
    landlord: (id, callback) => {
      reviewsApi
        .get(`/landlord/${id}`)
        .then(res => callback(null, res.data))
        .catch((res: AxiosResponse) => callback(res.data))
    },
    user: (id, callback) => {
      reviewsApi
        .get(`/user/${id}`)
        .then(res => callback(null, res.data))
        .catch((res: AxiosResponse) => callback(res.data))
    },
  },
}

export default Review
