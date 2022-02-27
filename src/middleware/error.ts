import { Express, Request, Response, NextFunction } from 'express'
import NotFound from '../error/notFound'
import BaseError from '../error/BaseError'

export const setupError = (app: Express) => {
  // 404
  app.use('*', () => {
    throw new NotFound()
  })

  // 500
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res
      .status(200)
      .json(err instanceof BaseError ? err : new BaseError(err.message, 500))
  })
}
