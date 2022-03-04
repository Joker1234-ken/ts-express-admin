import express, { Router } from 'express'
import MenuService from './../services/menuService'

const menu: Router = express.Router()

menu.get('/', MenuService.list)

export { menu }
