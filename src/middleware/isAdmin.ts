import { secret } from './../config/setting'
import { verify } from 'jsonwebtoken'
import express from 'express'
import BaseError from '../error/BaseError'

export const isAdmin = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = (req.headers.authorization as any).split(' ').pop()

  const user = verify(token, secret)

  if (!user) throw new BaseError('token失效')
}
