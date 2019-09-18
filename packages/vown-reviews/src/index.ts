import axios, { AxiosResponse } from 'axios'
import { IReview, IReviewUpdate } from '@vown/types'

class Review {
  private baseURL: any
  private headers: any
  private version = 'v1'
  private host = `https://us-central1-veriown-reviews.cloudfunctions.net/api/${this.version}reviews`

  constructor(token: string, user: string) {
    this.baseURL = `${this.host}/${this.version}`
    this.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      token: token,
      user: user,
    }
  }

  create(review: IReview): Promise<IReview[]> {
    return axios
      .post(`${this.baseURL}/create`, review, { headers: this.headers })
      .then(res => res.data)
      .catch((res: AxiosResponse) => res.data)
  }

  update(review: IReviewUpdate): Promise<IReview[]> {
    return axios
      .put(`${this.baseURL}/update`, review, { headers: this.headers })
      .then(res => res.data)
      .catch((res: AxiosResponse) => res.data)
  }

  retrieve() {
    return {
      landlord: (id: string): Promise<IReview[]> => {
        return axios
          .get(`${this.baseURL}/landlord/${id}`, { headers: this.headers })
          .then(res => res.data)
          .catch((res: AxiosResponse) => res.data)
      },
      user: (): Promise<IReview[]> => {
        return axios
          .get(`${this.baseURL}/user`, { headers: this.headers })
          .then(res => res.data)
          .catch((res: AxiosResponse) => res.data)
      },
    }
  }
}

export default Review
