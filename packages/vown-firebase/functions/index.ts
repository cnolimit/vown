import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { create, retrieveUser, retrieveLandlord, update } from './v1'
import { defaultApi } from './v1/errors'
admin.initializeApp()

exports.reviews = {
  v1: {
    create: functions.https.onCall((data, context) => {
      try {
        if (!context.auth)
          throw new functions.https.HttpsError('unauthenticated', 'user not logged in')
        return create(data, context.auth.uid)
      } catch (e) {
        return { ...defaultApi.Error, target: 'reviews-v1-create', message: e.message }
      }
    }),
    update: functions.https.onCall((data, context) => {
      try {
        if (!context.auth)
          throw new functions.https.HttpsError('unauthenticated', 'user not logged in')
        return update(data, context.auth.uid)
      } catch (e) {
        return { ...defaultApi.Error, target: 'reviews-v1-update', message: e.message }
      }
    }),
    retrieve: {
      user: functions.https.onCall((data, context) => {
        try {
          if (!context.auth)
            throw new functions.https.HttpsError('unauthenticated', 'user not logged in')
          return retrieveUser(data, context.auth.uid)
        } catch (e) {
          return { ...defaultApi.Error, target: 'reviews-v1-retrieve-user', message: e.message }
        }
      }),
      landlord: functions.https.onCall(data => {
        try {
          if (!data.landlord_id)
            throw new functions.https.HttpsError('failed-precondition', 'landlord_id is expected')
          return retrieveLandlord(data)
        } catch (e) {
          return { ...defaultApi.Error, target: 'reviews-v1-retrieve-landlord', message: e.message }
        }
      }),
    },
  },
}

exports.createUser = functions.auth.user().onCreate(user => {
  const { email, uid, metadata, displayName, photoURL, phoneNumber } = user

  return admin
    .firestore()
    .collection('users')
    .doc(uid)
    .set({
      uid,
      email,
      phoneNumber,
      photoURL,
      displayName,
      createdAt: metadata.creationTime,
    })
})
