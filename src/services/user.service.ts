import { Request, Response, NextFunction } from 'express'
import JSONResponse from './../utils/data'
import UserModule from './../modules/user.module'
import { encrypt } from './../utils/tools'
import BaseError from './../error/BaseError'
import { decode } from '../utils/tools'
const model = new UserModule()

export default class UserService {
  public static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, pageSize } = req.body

      const [data, [{ total }]]: any[] = await model.search({ page, pageSize })

      const result = new JSONResponse({ total, data, page, pageSize })

      res.json(result)
    } catch (error) {
      next(error)
    }
  }

  public static async create(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.password = encrypt(req.body.password)

      await model.create(req.body)

      const result = new JSONResponse()

      res.json(result)
    } catch (error) {
      next(error)
    }
  }

  public static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await model.delete(req.body.id)

      const result = new JSONResponse()

      res.json(result)
    } catch (error) {
      next(error)
    }
  }

  public static async update(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.password = encrypt(req.body.password)

      await model.update(req.body.id, req.body)

      const result = new JSONResponse()

      res.json(result)
    } catch (error) {
      next(error)
    }
  }

  public static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const [user] = await model.detail(req.body)

      if (!user) throw new BaseError('账号不存在', 1001)

      if (!decode(req.body.password, user.password)) {
        throw new BaseError('密码错误', 1001)
      }

      const result = new JSONResponse({ token: '123123' })

      res.json(result)
    } catch (error) {
      next(error)
    }
  }
}
