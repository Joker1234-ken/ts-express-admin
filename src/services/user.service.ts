import { Request, Response, NextFunction } from 'express'
import userModel, { User } from './../modules/user'
import { genSaltSync, hashSync } from 'bcryptjs'
import BaseError from './../error/BaseError'
class UserService {
  public async list(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userModel.list()

      res.json(users)
    } catch (error) {
      next(error)
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { password: pwd }: User = req.body

      if (!pwd) throw new BaseError('密码不能为空')
      // 随机字符串
      const salt = genSaltSync(10)

      // 对明文加密
      const password = hashSync(pwd, salt)

      const result = await userModel.create({ ...req.body, password })

      res.json(result)
    } catch (error) {
      next(error)
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userModel.delete(req.body)

      res.json(result)
    } catch (error) {
      next(error)
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userModel.update(req.body)

      res.json(result)
    } catch (error) {
      next(error)
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userModel.detail(req.body)

      res.json(result)
    } catch (error) {
      next(error)
    }
  }
}

export default new UserService()
