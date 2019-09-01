import * as express from 'express'
import * as jsonwebtoken from 'jsonwebtoken'
import { JWTSecret } from '../../utils/constants'
import { sessionsApi } from './errors'
import { isInvalidBody, addMinutesToMS } from '../../utils'

const router = express.Router()

const generateToken = (id: string, user: string) => {
  return jsonwebtoken.sign(
    { unique_token_id: id, user: user, exp: addMinutesToMS(15, Date.now()) },
    JWTSecret
  )
}

router.post('/token', (req, res) => {
  const user = req.body.user
  const uid = req.body.uid
  const errorObj = isInvalidBody({ user, uid }, sessionsApi.Error422)

  if (errorObj) return res.status(422).send(errorObj)

  return res.send({ token: generateToken(req.body.uid, req.body.user) })
})

export default router
