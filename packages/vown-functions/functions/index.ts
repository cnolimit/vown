import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
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
