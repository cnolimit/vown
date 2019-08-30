import axios, { AxiosResponse } from 'axios'
import { IReview, IReviewUpdate } from '@vown/types'

type Callback = (error: string | null, data?: object) => void

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

class Review {
  private token: string
  private user: string

  constructor(token: string, user: string) {
    this.token = token
    this.user = user
  }

  create(review: IReview, callback: Callback) {
    reviewsApi
      .post('/create', review)
      .then(res => callback(null, res.data))
      .catch((res: AxiosResponse) => callback(res.data))
  }

  update(review: IReviewUpdate, callback: Callback) {
    reviewsApi
      .put('/update', review)
      .then(res => callback(null, res.data))
      .catch((res: AxiosResponse) => callback(res.data))
  }

  retrieve() {
    return {
      landlord: (id: string, callback: Callback) => {
        reviewsApi
          .get(`/landlord/${id}`)
          .then(res => callback(null, res.data))
          .catch((res: AxiosResponse) => callback(res.data))
      },
      user: (callback: Callback) => {
        reviewsApi
          .get(`/user`, {
            headers: {
              token: this.token,
              user: this.user,
            },
          })
          .then(res => callback(null, res.data))
          .catch((res: AxiosResponse) => callback(res.data))
      },
    }
  }
}

export default Review
