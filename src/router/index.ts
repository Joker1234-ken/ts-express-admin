import express, { Express } from 'express'
import userRouter from '../controllers/user'

export const setupRouter = (app: Express) => {
  const router = express.Router()

  router.use('/user', userRouter)

  app.use('/api', router)
}
