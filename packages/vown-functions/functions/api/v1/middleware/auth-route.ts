import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { JWTSecret } from '../../../utils/constants'
import { IJWT } from '../../../types'
import { headerApi } from '../errors'
import { isInvalid } from '../../../utils'

const authRoute = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('token') as string
  const user = req.header('user') as string

  if (!token)
    return res.status(422).send(isInvalid([{ key: 'token', exists: false }], headerApi.Error422))
  if (!user)
    return res.status(422).send(isInvalid([{ key: 'user', exists: false }], headerApi.Error422))

  jwt.verify(token, JWTSecret, (err, decoded) => {
    const _decoded = decoded as IJWT

    if (err)
      return res.status(401).send(isInvalid([{ key: 'token', exists: false }], headerApi.Error401))

    if (user !== _decoded.user)
      return res.status(401).send(isInvalid([{ key: 'user', exists: false }], headerApi.Error401))

    if (Date.now() >= _decoded.exp * 100) {
      return res
        .status(401)
        .send(isInvalid([{ key: 'token_exp', exists: false }], headerApi.Error401))
    }

    req.body.token = _decoded
    return _decoded
  })

  next()
  return
}

export default authRoute
