import * as express from 'express'
import * as jsonwebtoken from 'jsonwebtoken'

const secret = 'YOLO'
const router = express.Router()

router.post('/v1', (req, res) => {
  const token = jsonwebtoken.sign(
    { user: 'id', exp: Math.floor(Date.now() / 100) + 60 * 60 },
    secret
  )
  res.send({ token })
})

export default router
