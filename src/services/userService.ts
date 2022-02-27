import { createToken } from './../utils/tools'
import { Request, Response, NextFunction } from 'express'
import { apiResponse } from '../utils/data'
import UserModule from '../modules/userModule'
import { encrypt, decode } from '../utils/tools'
import BaseError from '../error/BaseError'

export default class UserService {
  public static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, pageSize } = req.body

      const [data, [{ total }]]: any[] = await UserModule.search({
        page,
        pageSize
      })

      const result = apiResponse({ total, page, pageSize, data })

      res.json(result)
    } catch (error) {
      next(error)
    }
  }

  public static async create(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.password = encrypt(req.body.password)

      await UserModule.create(req.body)

      res.json(apiResponse())
    } catch (error) {
      next(error)
    }
  }

  public static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await UserModule.delete(req.body.id)

      res.json(apiResponse())
    } catch (error) {
      next(error)
    }
  }

  public static async update(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.password = encrypt(req.body.password)

      await UserModule.update(req.body.id, req.body)

      res.json(apiResponse())
    } catch (error) {
      next(error)
    }
  }

  public static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const [user] = await UserModule.detail(req.body)

      if (!user) throw new BaseError('账号不存在')

      if (!decode(req.body.password, user.password)) {
        throw new BaseError('密码错误')
      }

      const token = createToken({ username: user.username })

      const result = apiResponse({ token })

      res.json(result)
    } catch (error) {
      next(error)
    }
  }

  public static async getInfo(req: Request, res: Response, next: NextFunction) {
    const result = apiResponse()

    res.json(result)
  }
}
