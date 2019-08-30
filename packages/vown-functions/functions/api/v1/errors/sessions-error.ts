import { ResponseError } from '../../../types'

export const Error422: ResponseError = {
  code: 'MISSING_BODY_VALUES',
  message: 'Missing body',
  target: 'sessions',
  details: [
    {
      code: 'MISSING_USER',
      message: 'Missing user',
      target: 'sessions token body',
      key: 'user',
    },
    {
      code: 'MISSING_UID',
      message: 'Missing uid',
      target: 'sessions token body',
      key: 'uid',
    },
  ],
}

export default { Error422 }
