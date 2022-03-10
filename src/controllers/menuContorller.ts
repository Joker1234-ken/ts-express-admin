import express, { Router } from 'express'
import MenuService from './../services/menuService'
import { isAdmin } from './../middleware/isAdmin'

const menu: Router = express.Router()

menu.get('/', isAdmin, MenuService.list)

export { menu }
