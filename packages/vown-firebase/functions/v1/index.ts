import { IReview, Collections, ReviewKeys, ResponseError } from '../types'
import { createApi, defaultApi, retrieveApi, updateApi } from './errors'
import { isInvalidBody, isInvalid, getEmptyValueKeys, hasEmptyValues } from '../utils'
import uuid = require('uuid')
import admin = require('firebase-admin')

const MODULE = 'reviews-v1'

const fetchReviews = async (idName: string, idValue: string, limit?: string) => {
  const limitInt = limit ? parseInt(limit, 10) : 30
  const reviewDocs = await admin
    .firestore()
    .collection(Collections.REVIEWS)
    .where(idName, '==', idValue)
    .orderBy('rating')
    .limit(limitInt)
    .get()

  const reviews: IReview[] = []

  reviewDocs.forEach(snap => {
    reviews.push(snap.data() as IReview)
  })

  return { reviews, [idName]: idValue }
}

export const create = async (data: IReview, uid: string) => {
  try {
    const review: IReview = data
    const error = isInvalidBody(review, createApi.Error422)
    if (error) return error

    const id = uuid()
    const userRef = await admin
      .firestore()
      .collection(Collections.USERS)
      .doc(uid)

    const landlordRef = await admin
      .firestore()
      .collection(Collections.LANDLORDS)
      .doc(review.landlord_id)

    const user = await userRef.get()
    const landlord = await landlordRef.get()
    const IDError = isInvalid(
      [
        { key: ReviewKeys.LANDLORD_ID, exists: landlord.exists },
        { key: ReviewKeys.USER_ID, exists: user.exists },
      ],
      createApi.Error404
    )

    if (IDError) return IDError

    await admin
      .firestore()
      .collection(Collections.REVIEWS)
      .doc(id)
      .create({ id, landlord_id: review.landlord_id, user_id: uid, ...review })

    return await fetchReviews(ReviewKeys.USER_ID, uid)
  } catch (e) {
    return { ...defaultApi.Error, target: `${MODULE}-create`, message: e.message }
  }
}

export const retrieveLandlord = async (data: IReview) => {
  const { landlord_id, limit } = data

  const landlordRef = await admin
    .firestore()
    .collection(Collections.LANDLORDS)
    .doc(landlord_id)

  const landlord = await landlordRef.get()
  const IDError = isInvalid(
    [{ key: ReviewKeys.LANDLORD_ID, exists: landlord.exists }],
    retrieveApi.Error404
  )

  if (IDError) return IDError

  try {
    return await fetchReviews(ReviewKeys.LANDLORD_ID, landlord_id, limit)
  } catch (e) {
    return { ...defaultApi.Error, target: `${MODULE}-retrieve-landlord`, message: e.message }
  }
}

export const retrieveUser = async (data: IReview, uid: string) => {
  const user_id = uid
  const limit = data.limit || 30
  const userRef = await admin
    .firestore()
    .collection(Collections.USERS)
    .doc(user_id)

  const user = await userRef.get()
  const IDError = isInvalid(
    [{ key: ReviewKeys.USER_ID, exists: user.exists }],
    retrieveApi.Error404
  )

  if (IDError) return IDError

  try {
    return await fetchReviews(ReviewKeys.USER_ID, user_id, limit)
  } catch (e) {
    return { ...defaultApi.Error, target: `${MODULE}-retrieve-user`, message: e.message }
  }
}

export const update = async (data: IReview, uid: string) => {
  try {
    const user_id = uid
    const { review, review_id }: IReview = data
    const { landlord_id } = review
    const missingValues = hasEmptyValues(review)
    let IDError: ResponseError | false = false

    if (missingValues) {
      const missingValueKeys = getEmptyValueKeys(review).map(key => ({ key, exists: false }))

      return isInvalid(missingValueKeys, updateApi.Error422)
    }

    if (landlord_id) {
      const landlordRef = await admin
        .firestore()
        .collection(Collections.LANDLORDS)
        .doc(review.landlord_id)

      const landlord = await landlordRef.get()
      IDError = isInvalid(
        [{ key: ReviewKeys.LANDLORD_ID, exists: landlord.exists }],
        updateApi.Error404
      )
    }

    if (user_id) {
      const userRef = await admin
        .firestore()
        .collection(Collections.USERS)
        .doc(review.user_id)

      const user = await userRef.get()
      IDError = isInvalid([{ key: ReviewKeys.USER_ID, exists: user.exists }], updateApi.Error404)
    }

    if (IDError) return IDError
    const reviewRef = await admin.firestore().collection(Collections.REVIEWS)
    await reviewRef.doc(review_id).update({ ...review })
    const reviewDocs = await reviewRef.get()
    const reviews: IReview[] = []

    reviewDocs.forEach(snap => {
      reviews.push(snap.data() as IReview)
    })
    return { reviews }
  } catch (e) {
    return { ...defaultApi.Error, target: `${MODULE}-update`, message: e.message }
  }
}
