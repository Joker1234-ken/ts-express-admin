import { Request, Response, NextFunction } from 'express'

class Service {
  list(req: Request, res: Response, next: NextFunction): void {
    res.send('list')
  }

  create(req: Request, res: Response, next: NextFunction): void {
    res.send('create')
  }

  delete(req: Request, res: Response, next: NextFunction): void {
    res.send('delete')
  }

  update(req: Request, res: Response, next: NextFunction): void {
    res.send('update')
  }
}

export default Service
