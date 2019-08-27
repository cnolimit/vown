export interface IReview {
  [index: string]: any
  title: string
  difficulty_rating: number
  experience_rating: number
  approve_of_landlord: boolean
  recommends: boolean
  pros?: string
  cons?: string
  questions?: IQuestion[]
  landlord_id: string
  user_id: string
  rating: number
}

export interface IReviewUpdate {
  [index: string]: any
  title?: string
  difficulty_rating?: number
  experience_rating?: number
  approve_of_landlord?: boolean
  recommends?: boolean
  pros?: string
  cons?: string
  questions?: IQuestion[]
  landlord_id?: string
  user_id?: string
  rating?: number
}

export interface IQuestion {
  question: string
  answer: string
}

export enum Collections {
  LANDLORDS = 'landlords',
  REVIEWS = 'reviews',
  USERS = 'users',
}

export enum ReviewKeys {
  TITLE = 'title',
  DIFFICULTY_RATING = 'difficulty_rating',
  EXPERIENCE_RATING = 'experience_rating',
  APPROVE_OF_LANDLORD = 'approve_of_landlord',
  RECOMMENDS = 'recommends',
  PROS = 'pros',
  CONS = 'cons',
  QUESTIONS = 'questions',
  LANDLORD_ID = 'landlord_id',
  USER_ID = 'user_id',
}

export interface ILandlord {
  title: string
  logo: string
  rating: number
  reviews: IReview[]
}

export interface IUserDetails {
  displayName: string
  email: string
  photoURL: string
  uid: string
  token_id: string
  token: string
}
