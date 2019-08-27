import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import * as uuid from 'uuid/v4'
import apiReviewsV1 from './api/v1/reviews'
import apiSessionsV1 from './api/v1/sessions'

const app = express()
admin.initializeApp()

app.use(cors({ origin: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Welcome to the reviews API'))

app.use('/sessions', apiSessionsV1)
app.use('/reviews', apiReviewsV1)

exports.api = functions.https.onRequest(app)

exports.createUser = functions.auth.user().onCreate(user => {
  const { email, uid, metadata, displayName, photoURL, phoneNumber } = user
  console.log({ user })

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
      token_id: uuid(),
      createdAt: metadata.creationTime,
    })
})
