import { secret } from './../config/setting'
import { verify } from 'jsonwebtoken'
import express from 'express'
import { error } from '../utils/setupData'

export const isAdmin = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { authorization } = req.headers

  if (!authorization) throw error('token失效', 401)

  const token: string = (authorization as any).split(' ').pop()

  const user = verify(token, secret)

  if (!user) throw error('token失效', 401)
  ;(req as any).user = user

  next()
}
