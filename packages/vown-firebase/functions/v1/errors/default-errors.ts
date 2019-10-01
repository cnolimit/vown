import { ResponseError } from '../../types'

export const defaultError: ResponseError = {
  code: 'FAILED_REQUEST',
  message: 'Failed to process request',
  target: 'request',
  details: [],
}

export default { Error: defaultError }
