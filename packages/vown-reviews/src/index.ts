import axios, { AxiosResponse, AxiosInstance } from 'axios'
import { IReview, IReviewUpdate } from '@vown/types'

type Callback = (error: string | null, data?: object) => void

class Review {
  private token: string
  private user: string
  private reviewsApi: AxiosInstance
  private version = 'v1'
  private host = `https://us-central1-veriown-reviews.cloudfunctions.net/api/${this.version}reviews`

  constructor(token: string, user: string) {
    this.token = token
    this.user = user

    this.reviewsApi = axios.create({
      baseURL: `${this.host}/${this.version}`,
      timeout: 25000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        token: this.token,
        user: this.user,
      },
    })
  }

  create(review: IReview, callback: Callback) {
    this.reviewsApi
      .post('/create', review)
      .then(res => callback(null, res.data))
      .catch((res: AxiosResponse) => callback(res.data))
  }

  update(review: IReviewUpdate, callback: Callback) {
    this.reviewsApi
      .put('/update', review)
      .then(res => callback(null, res.data))
      .catch((res: AxiosResponse) => callback(res.data))
  }

  retrieve() {
    return {
      landlord: (id: string, callback: Callback) => {
        this.reviewsApi
          .get(`/landlord/${id}`)
          .then(res => callback(null, res.data))
          .catch((res: AxiosResponse) => callback(res.data))
      },
      user: (callback: Callback) => {
        this.reviewsApi
          .get(`/user`)
          .then(res => callback(null, res.data))
          .catch((res: AxiosResponse) => callback(res.data))
      },
    }
  }
}

export default Review
