import { db } from './db'

export interface User {
  id?: number
  username?: string
  password?: string
}

class UserModule {
  /**
   * list
   */
  public list() {
    return db.conn("select u_id id,username,'' password from user")
  }

  /**
   * create
   */
  public create({ username, password }: User) {
    return db.conn('insert user(username,password) values(?,?)', [
      username,
      password
    ])
  }

  /**
   * delete
   */
  public delete({ id }: User) {
    return db.conn('delete from user where u_id = ?', [id])
  }

  /**
   * detail
   */
  public detail({ username }: User) {
    return db.conn('select username,password from user where username = ?', [
      username
    ])
  }

  /**
   * update
   */
  public update({ id, username, password }: User) {
    return db.conn('update user set username = ?,password = ? where u_id = ?', [
      username,
      password,
      id
    ])
  }
}

const user = new UserModule()

export default user
