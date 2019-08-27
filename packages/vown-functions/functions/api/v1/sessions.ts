import * as express from 'express'
import * as jsonwebtoken from 'jsonwebtoken'

const secret = 'YOLO'
const router = express.Router()

const generateToken = (id: string = '') => {
  return jsonwebtoken.sign(
    { unique_token_id: id, exp: Math.floor(Date.now() / 100) + 60 * 60 },
    secret
  )
}

router.post('/v1/token', (req, res) => res.send({ token: generateToken(req.body.uid) }))

export default router
