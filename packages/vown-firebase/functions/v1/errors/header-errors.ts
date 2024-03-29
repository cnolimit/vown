import { ResponseError } from '../../types'

export const Error401: ResponseError = {
  code: 'INVALID_HEADER',
  message: 'Invalid header values',
  target: 'header',
  details: [
    {
      code: 'INVALID_TOKEN',
      message: 'invalid token',
      target: 'headers verification',
      key: 'token',
    },
    {
      code: 'INVALID_USER',
      message: 'invalid user',
      target: 'headers verification',
      key: 'user',
    },
    {
      code: 'EXPIRED_TOKEN',
      message: 'token expired',
      target: 'headers verification',
      key: 'token_exp',
    },
  ],
}

export const Error422: ResponseError = {
  code: 'MISSING_HEADER_VALUES',
  message: 'Missing header values',
  target: 'header',
  details: [
    {
      code: 'MISSING_TOKEN',
      message: 'Missing token',
      target: 'headers verification',
      key: 'token',
    },
    {
      code: 'MISSING_USER_ID',
      message: 'Missing user id',
      target: 'headers verification',
      key: 'user',
    },
  ],
}

export default { Error401, Error422 }
