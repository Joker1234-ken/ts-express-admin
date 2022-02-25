import express, { Router } from 'express'
import userService from '../services/user.service'
import { validator } from './../middleware/validator'

const user: Router = express.Router()

const userOptions = {
  username: 'string',
  password: 'string'
}

user.post('/', validator(userOptions), userService.create)

user.post('/login', validator(userOptions), userService.login)

user.delete('/', validator({ id: 'number' }), userService.delete)

user.put('/', validator({ id: 'number', ...userOptions }), userService.update)

user.post(
  '/list',
  validator({ pageSize: 'number', page: 'number' }),
  userService.list
)

export { user }
