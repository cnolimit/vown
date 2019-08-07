export interface IReview {
  title: string
  difficulty_rating: number
  experience_rating: number
  approve_of_landlord: boolean
  recommends: boolean
  pros: string
  cons: string
  questions: IQuestion[]
}

export interface IQuestion {
  question: string
  answer: string
}

export interface ILandlord {
  title: string
  logo: string
  rating: number
  reviews: IReview[]
}
