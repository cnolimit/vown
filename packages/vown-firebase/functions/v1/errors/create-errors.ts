import { ResponseError } from '../../types'

export const Error422: ResponseError = {
  code: 'MISSING_REQUIRED_FIELDS',
  message: 'Missing required fields',
  target: 'review',
  details: [
    {
      code: 'MISSING_TITLE_FIELD',
      message: 'missing title field',
      target: 'review object',
      key: 'title',
    },
    {
      code: 'MISSING_RATING_FIELD',
      message: 'missing rating field',
      target: 'review object',
      key: 'rating',
    },
    {
      code: 'MISSING_DIFFICULTY_RATING_FIELD',
      message: 'missing difficulty rating field',
      target: 'review object',
      key: 'difficulty_rating',
    },
    {
      code: 'MISSING_EXPERIENCE_RATING_FIELD',
      message: 'missing experience rating field',
      target: 'review object',
      key: 'experience_rating',
    },
    {
      code: 'MISSING_APPROVE_OF_LANDLORD_FIELD',
      message: 'missing approve or landlord field',
      target: 'review object',
      key: 'approve_of_landlord',
    },
    {
      code: 'MISSING_RECCOMENDS_FIELD',
      message: 'missing recommends field',
      target: 'review object',
      key: 'recommends',
    },
    {
      code: 'MISSING_LANDLORD_FIELD',
      message: 'missing landlord field',
      target: 'review object',
      key: 'landlord_id',
    },
    {
      code: 'MISSING_USER_FIELD',
      message: 'missing user field',
      target: 'review object',
      key: 'user_id',
    },
  ],
}

export const Error404: ResponseError = {
  code: 'NOT_FOUND',
  message: 'id not found',
  target: 'id',
  details: [
    {
      code: 'INVALID_LANDLORD_ID',
      message: 'Invalid landlord id',
      target: 'landlord',
      key: 'landlord_id',
    },
    {
      code: 'INVALID_USER_ID',
      message: 'Invalid user id',
      target: 'user',
      key: 'user_id',
    },
  ],
}

export default { Error422, Error404 }
