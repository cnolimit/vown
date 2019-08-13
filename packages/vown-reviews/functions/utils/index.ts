import { ResponseError } from '../types'

type isInvalidProps = { key: string; exists: boolean }

/**
 * @desc - Checks the body for missing required values and uses the errorSchema
 * to determine the associated error for the missing attribute.
 * @param body
 * @param errorSchema
 * @returns - The errorSchema with the array of errors as the value in the details property
 */
export const isInvalidBody = (body: any, errorSchema: ResponseError) => {
  const missing_keys = errorSchema.details.filter(error => !body[error.key])

  const errors = { ...errorSchema, details: missing_keys }

  return missing_keys.length ? errors : false
}

/**
 * @desc - Checks the array of id's for any 'exists' properties with false value
 * and uses the associated key value to retrieve the corrolating error.
 * @param ids - Array of objects { key: string, exists: boolean }
 * @param errorSchema -
 * @returns - The errorSchema with the array of errors as the value in the details property
 */
export const isInvalid = (ids: isInvalidProps[], errorSchema: ResponseError) => {
  const errorKeys = ids.map(id => !id.exists && id.key).filter(Boolean)

  const errors = errorSchema.details.filter(err => errorKeys.includes(err.key))

  return errorKeys.length ? { ...errorSchema, details: errors } : false
}
