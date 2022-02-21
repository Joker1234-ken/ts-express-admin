import express, { Router } from 'express'
import userService from '../services/user.service'

const userRouter: Router = express.Router()

userRouter.get('/', userService.list)

userRouter.post('/', userService.create)

userRouter.delete('/', userService.delete)

userRouter.put('/', userService.update)

userRouter.post('/login', userService.login)

export default userRouter
