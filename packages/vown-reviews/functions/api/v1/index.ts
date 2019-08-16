import * as express from 'express'
import * as admin from 'firebase-admin'
import * as uuid from 'uuid/v4'
import { IReview, Collections, ReviewKeys, ResponseError } from '../../types'
import { isInvalidBody, isInvalid, hasEmptyValues, getEmptyValueKeys } from '../../utils'
import { createApi, updateApi, defaultApi } from '../v1/errors'

const router = express.Router()

router.put('/v1/update/:review_id', async (req, res) => {
  try {
    const review: IReview = req.body
    const review_id: string = req.params.review_id
    const { landlord_id, user_id } = review
    const missingValues = hasEmptyValues(review)
    let IDError: ResponseError | false = false

    if (missingValues) {
      const missingValueKeys = getEmptyValueKeys(review).map(key => ({ key, exists: false }))

      return res.status(422).send(isInvalid(missingValueKeys, updateApi.Error422))
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

    if (IDError) return res.status(404).send(IDError)

    const reviewRef = await admin.firestore().collection(Collections.REVIEWS)

    await reviewRef.doc(review_id).update({ ...review })

    const reviewDocs = await reviewRef.get()

    const reviews: IReview[] = []

    reviewDocs.forEach(snap => {
      reviews.push(snap.data() as IReview)
    })

    return res.send({ reviews })
  } catch (e) {
    return res.status(422).send({ ...defaultApi.Error, target: req.route.path, message: e.message })
  }
})

/*
 * @Endpoint
 * @params
 * @body
 * @description
 *
 */
const fetchReviews = async (idName: string, idValue: string, limit?: number) => {
  const reviewDocs = await admin
    .firestore()
    .collection(Collections.REVIEWS)
    .where(idName, '==', idValue)
    .orderBy('rating')
    .limit(limit || 30)
    .get()

  const reviews: IReview[] = []

  reviewDocs.forEach(snap => {
    reviews.push(snap.data() as IReview)
  })

  return { reviews, [idName]: idValue }
}

/**
 * @Endpoint
 * @params
 * @body
 * @description
 *
 */
router.get('/v1/landlord/:landlord_id', async (req, res) => {
  const landlord_id = req.params.landlord_id
  const limit = req.query.limit

  const userRef = await admin
    .firestore()
    .collection(Collections.LANDLORDS)
    .doc(landlord_id)

  const landlord = await userRef.get()
  const IDError = isInvalid(
    [{ key: ReviewKeys.USER_ID, exists: landlord.exists }],
    createApi.Error404
  )

  if (IDError) return res.status(404).send(IDError)

  try {
    return res.send(await fetchReviews('landlord_id', landlord_id, limit))
  } catch (e) {
    return res.status(422).send({ ...defaultApi.Error, target: req.route.path, message: e.message })
  }
})

/**
 * @Endpoint
 * @params
 * @body
 * @description
 *
 */
router.get('/v1/user/:user_id', async (req, res) => {
  const user_id = req.params.user_id
  const limit = req.query.limit

  const userRef = await admin
    .firestore()
    .collection(Collections.USERS)
    .doc(user_id)

  const user = await userRef.get()
  const IDError = isInvalid([{ key: ReviewKeys.USER_ID, exists: user.exists }], createApi.Error404)

  if (IDError) return res.status(404).send(IDError)

  try {
    return res.send(await fetchReviews('user_id', user_id, limit))
  } catch (e) {
    return res.status(422).send({ ...defaultApi.Error, target: req.route.path, message: e.message })
  }
})

/**
 * @Endpoint - Create new review
 * @params - { landlord_id: string }
 * @body - { body: IReview }
 * @description - Will check if the landlord_id and the user_id are both valid
 * and if they are it will create a new review in the review collection and if not
 * it will return a 404 error
 */
router.post('/v1/create', async (req, res) => {
  try {
    const review: IReview = req.body
    const { landlord_id, user_id } = review
    const error = isInvalidBody(review, createApi.Error422)
    if (error) return res.status(422).send(error)

    const id = uuid()
    const userRef = await admin
      .firestore()
      .collection(Collections.USERS)
      .doc(review.user_id)

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

    if (IDError) return res.status(404).send(IDError)

    const reviewRef = await admin.firestore().collection(Collections.REVIEWS)

    await reviewRef.doc(id).create({ id, landlord_id, user_id, ...review })

    const reviewDocs = await reviewRef.get()

    const reviews: IReview[] = []

    reviewDocs.forEach(snap => {
      reviews.push(snap.data() as IReview)
    })

    return res.send({ reviews })
  } catch (e) {
    return res.status(422).send({ ...defaultApi.Error, target: req.route.path, message: e.message })
  }
})

export default router
