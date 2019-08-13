import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import apiV1 from './api/v1'

const app = express()
admin.initializeApp()

app.use(cors({ origin: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Welcome to the reviews API'))

app.use('/reviews', apiV1 as any)

exports.api = functions.https.onRequest(app)
