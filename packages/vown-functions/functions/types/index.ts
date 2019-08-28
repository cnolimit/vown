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

export interface IJWT {
  user: string
  exp: number
}

export interface ResponseErrorBody {
  code: string
  message: string
  target: string
}

export interface ResponseErrorDetails extends ResponseErrorBody {
  key: string
}

export interface ResponseError extends ResponseErrorBody {
  details: ResponseErrorDetails[]
}
