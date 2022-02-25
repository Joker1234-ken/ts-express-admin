import express, { Express } from 'express'
import { glob } from 'glob'
/**
 * 自动加载 Controller
 */
export const autoLoader = (app: Express, dir: string) => {
  const router = express.Router()

  glob.sync(`${dir}/*.ts`).forEach((file: string) => {
    const controller = require(file)

    const methods = Object.keys(controller)

    methods.forEach((methodName: string) => {
      router.use(`/${methodName}`, controller[methodName])
    })
  })

  app.use('/api', router)
}
