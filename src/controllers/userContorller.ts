import express, { Router } from 'express'
import userService from '../services/userService'
import { validator } from '../middleware/validator'

const user: Router = express.Router()

const userSchema = {
  username: 'string',
  password: 'string'
}

user.post('/', validator(userSchema), userService.create)

user.post('/login', validator(userSchema), userService.login)

user.delete('/', validator({ id: 'number' }), userService.delete)

user.put('/', validator({ id: 'number', ...userSchema }), userService.update)

user.post('/getInfo', userService.getInfo)

user.post(
  '/list',
  validator({ pageSize: 'number', page: 'number' }),
  userService.list
)

export { user }
