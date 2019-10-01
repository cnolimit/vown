import { ResponseError } from '../../types'

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

export default { Error404 }
