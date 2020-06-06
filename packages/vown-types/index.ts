// ----------------- Types ------------------
export type NOTIFICATION_MESSAGES = ERRORS | SUCCESS | INFO

export type IReviewObject = IReview & { createdAt: string }

// ----------------- Interfaces ------------------
export interface IReview {
  [index: string]: any
  title: string
  difficulty_rating: number
  experience_rating: number
  approve_of_landlord: boolean
  recommends: boolean
  description: string
  pros?: string
  cons?: string
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

export interface IUserProfileDetails {
  firstName?: string
  lastName?: string
  photo?: string
  displayName?: string
}

export interface INotification {
  id?: number
  type: NOTIFICATION_STATES
  message: NOTIFICATION_MESSAGES
}

// ----------------- ENUMS ------------------
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

export enum SUCCESS {
  SUCCESS_LOGIN = 'Logged in successfully',
  SUCCESS_CREATED_ACCOUNT = 'Account Created',
  SUCCESS_CREATED_REVIEW = 'Successfully created review',
}

export enum INFO {}

export enum NOTIFICATION_STATES {
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
  INFO = 'INFO',
}

export enum ERRORS {
  UNAUTHORISED = 'Not signed in',
  UNEXPECTED = 'Unexpected error, refresh and try again',
  INVALID_EMAIL = 'Invalid email',
  INVALID_PASSWORD = 'Invalid password',
  INVALID_PASSWORD_MATCH = "Passwords don't match",
  INVALID_LOGIN = 'Incorrect login details',
  INVALID_FIRST_NAME = 'First name should only contain letters',
  INVALID_LAST_NAME = 'Last name should only contain letters',
  INVALID_USERNAME = 'Invalid username',
  INVALID_USERNAME_LENGTH = 'Username too long. Max 20 charecters',
  LOGIN_FAILED = 'Log in failed',
  SIGN_UP_FAILED = 'Sign up failed',
  SIGN_IN_FAILED = 'Sign in failed',
  FAILED_TO_UPDATE = 'Failed to update',
  FAILED_TO_ADD_PROPERTY = 'Failed to add property',
  FAILED_TO_UPDATE_USER = 'Failed to update user',
  FAILED_TO_UPDATE_ADDRESS = 'Failed to update address',
  FAILED_TO_RETRIVE_DETAILS = 'Failed to retireve details',
  FAILED_TO_RETRIEVE_PROPERTIES = 'Failed to retireve properties',
  FAILED_TO_RETRIEVE_ADDRESS = 'Failed to retireve address',
  INVAILD_APPLICATION = 'Cannot apply to own property',
  INVALID_USER_ID = 'Invalid user id',
  INVALID_ADDRESS_ID = 'Invalid user address',
  INVALID_ADDRESS = 'Invalid address',
  ALREADY_APPLIED = 'Already applied for this property',
  FAILED_TO_RETRIEVE_APPLICATIONS = 'Failed to retrieve applications',
  FAILED_TO_CREATE_APPLICATION = 'Failed to create applications',
  FAILED_TO_CREATE_REVIEW = 'Failed to create review',

  // firebase errors
  MISSING_REQUIRED_FIELDS = 'Missing required fields',
  'auth/account-exists-with-different-credential' = 'Account already exists with the same email address',
  'auth/email-already-in-use' = 'Email already in use',
  'auth/wrong-password' = 'Sign in failed',
  'auth/user-not-found' = 'Sign in failed',
  'auth/network-request-failed' = 'You are offline at the momemt',
}
