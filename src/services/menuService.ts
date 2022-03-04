import { Request, Response, NextFunction } from 'express'
import MenuModule from '../modules/menuModule'
import { responseData } from '../utils/setupData'

export default class MenuService {
  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await MenuModule.find()

      res.json(responseData(result))
    } catch (error) {
      next(error)
    }
  }
}
