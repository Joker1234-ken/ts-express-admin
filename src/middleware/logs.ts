import express from 'express'
import { log4js } from '../utils/tools'

export const requestLogger = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  log4js(
    JSON.stringify({
      message: 'request',
      path: req.path,
      ip: req.ip,
      query: req.query,
      params: req.params,
      body: req.body
    })
  )

  next()
}
