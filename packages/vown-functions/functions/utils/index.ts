import { ResponseError, IReview } from '../types'

type isInvalidProps = { key: string; exists: boolean }

/**
 * @description - Checks the body for missing required values and uses the errorSchema
 * to determine the associated error for the missing attribute.
 * @param body
 * @param errorSchema
 * @returns - The errorSchema with the array of errors as the value in the details property
 */
export const isInvalidBody = (body: any, errorSchema: ResponseError) => {
  const missing_keys = errorSchema.details.filter(error => typeof body[error.key] === 'undefined')

  const errors = { ...errorSchema, details: missing_keys }

  return missing_keys.length ? errors : false
}

/**
 * @description - Checks the array of id's for any 'exists' properties with false value
 * and uses the associated key value to retrieve the corrolating error.
 * @param ids - Array of objects { key: string, exists: boolean }
 * @param errorSchema
 * @returns - The errorSchema with the array of errors as the value in the details property
 */
export const isInvalid = (ids: isInvalidProps[], errorSchema: ResponseError) => {
  const errorKeys = ids.map(id => !id.exists && id.key).filter(Boolean)

  const errors = errorSchema.details.filter(err => errorKeys.includes(err.key))

  return errorKeys.length ? { ...errorSchema, details: errors } : false
}

/**
 * @description - Checks object propertites to see if any are missing values
 * @param obj
 * @returns - Boolean that states whether or not the object has missing values
 */
export const hasEmptyValues = (obj: IReview) => Boolean(getEmptyValueKeys(obj).length)

/**
 * @description - Checks object propertites to see if any are missing values
 * @param obj
 * @returns - Array of keys which had misssing values from the object
 */
export const getEmptyValueKeys = (obj: IReview) => {
  const keyValues = Object.entries(obj)

  return keyValues.map(key => (obj[key[0]] === '' ? key[0] : '')).filter(Boolean)
}
