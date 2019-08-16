import { ResponseError } from '../../../types'

export const Error422: ResponseError = {
  code: 'INVALID_PROPERTIES',
  message: 'Invalid properties',
  target: 'properties',
  details: [
    {
      code: 'INVALID_TITLE_FIELD',
      message: 'invalid title field',
      target: 'review object',
      key: 'title',
    },
    {
      code: 'INVALID_RATING_FIELD',
      message: 'invalid rating field',
      target: 'review object',
      key: 'rating',
    },
    {
      code: 'INVALID_DIFFICULTY_RATING_FIELD',
      message: 'invalid difficulty rating field',
      target: 'review object',
      key: 'difficulty_rating',
    },
    {
      code: 'INVALID_EXPERIENCE_RATING_FIELD',
      message: 'invalid experience rating field',
      target: 'review object',
      key: 'experience_rating',
    },
    {
      code: 'INVALID_APPROVE_OF_LANDLORD_FIELD',
      message: 'invalid approve or landlord field',
      target: 'review object',
      key: 'approve_of_landlord',
    },
    {
      code: 'INVALID_RECCOMENDS_FIELD',
      message: 'invalid recommends field',
      target: 'review object',
      key: 'recommends',
    },
    // ====== New Errors ====== //
    {
      code: 'INVALID_LANDLORD_FIELD',
      message: 'invalid landlord field',
      target: 'review object',
      key: 'landlord_id',
    },
    {
      code: 'INVALID_USER_FIELD',
      message: 'invalid user field',
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
      message: 'landlord id does not exist',
      target: 'landlord',
      key: 'landlord_id',
    },
    {
      code: 'INVALID_USER_ID',
      message: 'user id does not exist',
      target: 'user',
      key: 'user_id',
    },
  ],
}

export default { Error422, Error404 }
