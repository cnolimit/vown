interface IReview {
  title: string
  difficulty_rating: number
  experience_rating: number
  approve_of_landlord: boolean
  recommends: boolean
  pros?: string
  cons?: string
  questions?: IQuestion[]
}

interface IQuestion {
  question: string
  answer: string
}

interface ReviewModule {
  create: (review: IReview, callback: (error: string | null, data?: object) => void) => void
}

declare const Reviews: ReviewModule

export default Reviews
