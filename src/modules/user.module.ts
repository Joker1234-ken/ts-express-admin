import { db } from './init.module'

export interface User {
  username: string
  password: string
}

export interface UserData {
  total: number
  page: number
  pageSize: number
  data: User[]
}

export interface Params {
  page: number
  pageSize: number
}

export default class UserModule {
  public search({ pageSize, page }: Params) {
    return Promise.all([
      db('user')
        .limit(page, pageSize)
        .find({}, { u_id: 'id', username: 1, '': 'password' }),
      db('user').find({}, { 'count(*)': 'total' })
    ])
  }

  public create({ username, password }: User) {
    return db('user').insertOne<User>({ username, password })
  }

  public delete(id: number) {
    return db('user').deleteOne({ u_id: id })
  }

  public update(id: number, { username, password }: User) {
    return db('user').updateOne({ u_id: id }, { $set: { username, password } })
  }

  public detail({ username }: User) {
    return db('user')
      .limit(1, 1)
      .find({ username }, { username: 1, password: 1 })
  }
}
