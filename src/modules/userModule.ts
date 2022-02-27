import { db } from './dbModule'

export interface User {
  username: string
  password: string
}

export interface Params {
  page: number
  pageSize: number
}

export default class UserModule {
  public static search({ pageSize, page }: Params) {
    return Promise.all([
      db('user')
        .limit(page, pageSize)
        .find({}, { u_id: 'id', username: 1, '': 'password' }),
      db('user').find({}, { 'count(*)': 'total' })
    ])
  }

  public static create({ username, password }: User) {
    return db('user').insertOne<User>({ username, password })
  }

  public static delete(id: number) {
    return db('user').deleteOne({ u_id: id })
  }

  public static update(id: number, { username, password }: User) {
    return db('user').updateOne({ u_id: id }, { $set: { username, password } })
  }

  public static detail({ username }: User) {
    return db('user')
      .limit(1, 1)
      .find({ username }, { username: 1, password: 1, u_id: 'id' })
  }
}
