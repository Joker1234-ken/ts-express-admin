import express, { Router } from 'express'
import userService from '../services/userService'
import { validator } from '../middleware/validator'
import { isAdmin } from './../middleware/isAdmin'

const user: Router = express.Router()

const userSchema = {
  username: 'string',
  password: 'string'
}

const page = { pageSize: 'number', page: 'number' }

user.post('/', isAdmin, validator(userSchema), userService.create)

user.post('/login', validator(userSchema), userService.login)

user.delete('/', isAdmin, validator({ id: 'number' }), userService.delete)

user.put(
  '/',
  isAdmin,
  validator({ id: 'number', ...userSchema }),
  userService.update
)

user.post('/getInfo', isAdmin, userService.getInfo)

user.get('/', isAdmin, validator(page), userService.list)

export { user }
