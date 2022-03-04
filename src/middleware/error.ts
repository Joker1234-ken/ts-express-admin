import { Express, Request, Response, NextFunction } from 'express'
import { BaseError, error } from '../utils/setupData'
import { log4js } from '../utils/tools'

export const setupError = (app: Express) => {
  // 404
  app.use('*', () => {
    throw error('请求错误,查看请求链接或者请求方式是否错误!', 404)
  })

  // 500
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    log4js(
      JSON.stringify({
        message: 'error',
        path: req.path,
        error: err
      })
    )

    res
      .status(200)
      .json(err instanceof BaseError ? err : error(err.message, 500))
  })
}
