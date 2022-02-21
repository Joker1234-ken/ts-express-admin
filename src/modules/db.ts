import {
  createPool,
  MysqlError,
  Pool,
  PoolConfig,
  PoolConnection,
  format
} from 'mysql'

import { mysqlConfig } from './../config/db.config'

// 用 createConnection 创建 Mysql 连接，每执行一次 connection.query 都是一个全新的连接，会造成一个资源的极大浪费，降低性能。

// 连接池是另外的一种执行方法，它一次性的创建了多个连接，然后根据客户端的查询，自动的 分发、复用、管理 这些连接。

class DbModule {
  pool: Pool
  constructor(config: PoolConfig) {
    this.pool = createPool(config)
  }

  conn(sql: string = '', values: any[] = []) {
    if (values.length > 0) {
      sql = format(sql, values)
    }
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err: MysqlError, connection: PoolConnection) => {
        if (err) {
          throw reject(err)
        } else {
          connection.query(sql, (err: MysqlError, result: any) => {
            if (err) {
              throw reject(err)
            } else {
              resolve(result)
            }
          })
          connection.release()
        }
      })
    })
  }
}

const db = new DbModule(mysqlConfig)

export { db }
