import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import { IReview } from '../types'

const app = express()
admin.initializeApp()

app.use(cors({ origin: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Welcome to the reviews API'))

app.post('/reviews', async (req, res) => {
  const review = req.body

  try {
    if (!Object.values(review).length) {
      res.status(422).send(`Failed to create review`)
    }

    await admin
      .firestore()
      .collection('reviews')
      .doc()
      .create({ ...review })

    const reviewDocs = await admin
      .firestore()
      .collection('reviews')
      .get()

    let reviews: IReview[] = []

    reviewDocs.forEach(snap => {
      reviews.push(snap.data() as IReview)
    })

    res.send({ reviews })
  } catch (e) {
    res.status(422).send(`Failed to create review - Error: ${e.message}`)
  }
})

app.get('/reviews', async (req, res) => {
  try {
    const reviews = await admin
      .firestore()
      .collection('reviews')
      .doc()
      .get()
    console.log(reviews)

    res.send({ data: reviews.data() })
  } catch (e) {
    res.status(422).send(`Failed to create review - Error: ${e.message}`)
  }
})

exports.api = functions.https.onRequest(app)
