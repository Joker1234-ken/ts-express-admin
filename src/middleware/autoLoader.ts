import express, { Express } from 'express'
import { glob } from 'glob'
import { requestLogger } from './logs'
/**
 * 自动加载 Controller
 */
export const autoLoader = (app: Express, dir: string) => {
  const router = express.Router()

  glob.sync(`${dir}/*.*`).forEach((file: string) => {
    if (/.[ts | js]$/.test(file)) {
      const controller = require(file)

      const methods = Object.keys(controller)

      methods.forEach((methodName: string) => {
        router.use(`/${methodName}`, controller[methodName])
      })
    }
  })

  app.use('/api', router, requestLogger)
}
