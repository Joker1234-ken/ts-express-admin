import { Request, Response, NextFunction } from 'express'
import Service from '.'

class UserService extends Service {
  login(req: Request, res: Response, next: NextFunction): void {
    res.send('login')
  }
}

export default new UserService()
