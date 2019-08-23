import { ResponseError } from '../../../types'

export const Error401: ResponseError = {
  code: 'INVALID_HEADER',
  message: 'Invalid header',
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
      key: 'token',
    },
  ],
}

export default { Error401 }
