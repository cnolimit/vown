import * as express from 'express'
import apiReviewsV1 from './reviews'
import apiSessionsV1 from './sessions'

const router = express.Router()

router.use('/sessions', apiSessionsV1)
router.use('/reviews', apiReviewsV1)

export default router
