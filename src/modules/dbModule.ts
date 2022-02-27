import { mysqlConfig } from '../config/setting'
import {
  createPool,
  MysqlError,
  Pool,
  PoolConfig,
  PoolConnection,
  format
} from 'mysql'
import { isType } from '../utils/tools'
import MError from '../error/mysqlError'

// 用 createConnection 创建 Mysql 连接，每执行一次 connection.query 都是一个全新的连接，会造成一个资源的极大浪费，降低性能。

// 连接池是另外的一种执行方法，它一次性的创建了多个连接，然后根据客户端的查询，自动的 分发、复用、管理 这些连接。

class BaseMysql {
  private pool: Pool
  constructor(config: PoolConfig) {
    this.pool = createPool(config)
  }

  public conn(sql: string = '', values: any[] = []): Promise<any> {
    if (values.length > 0) {
      sql = format(sql, values)
    }
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err: MysqlError, connection: PoolConnection) => {
        if (err) {
          reject(new MError(err.sqlMessage))
        } else {
          connection.query(sql, (err: MysqlError, result: any) => {
            if (err) {
              reject(new MError(err.sqlMessage))
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

class InitMysql extends BaseMysql {
  table: string
  row: string = ''
  wheres: string = ''
  values: any[] = []
  limits: string = ''
  constructor(table: string) {
    super(mysqlConfig)
    this.table = table
  }

  /**
   * @param {*} params
   * @param {*} [queryRows]
   * @return {*}
   * @memberof BaseModel
   */
  public find<T>(params?: any, queryRows?: T): Promise<any> {
    // todo 获取展示的列 否则 就是全部
    if (queryRows) {
      const rows: any[] = []
      for (const k in queryRows) {
        if (typeof queryRows[k] === 'string') {
          const showRow = queryRows[k] ? queryRows[k] : ` '${queryRows[k]}'`

          const row = k || `'${k}'`

          rows.push(row + ' ' + showRow)
        } else {
          rows.push(k)
        }
      }

      this.row = rows.join()
    } else {
      this.row = '*'
    }

    if (isType('Object', params)) {
      const keys = Object.keys(params)

      if (keys.length > 0) {
        this.where(params)
      }
    }

    const sql = `select ${this.row} from ${this.table} ${this.wheres} ${this.limits}`

    console.log(sql)

    return this.conn(sql, this.values)
  }

  /**
   * 条件查询
   * @private
   * @param {*} params
   * @memberof BaseModel
   */
  private where(params: any): void {
    const wheres = []
    const values = []

    for (const k in params) {
      if (isType('Object', params[k])) {
        for (const key in params[k]) {
          let operator = ''
          if (key === '$gt') {
            operator = '>'
          } else if (key === '$gte') {
            operator = '>='
          } else if (key === '$lt') {
            operator = '<'
          } else if (key === '$lte') {
            operator = '<='
          }
          wheres.push(`${k} ${operator} ?`)
          values.push(params[k][key])
        }
      } else {
        wheres.push(`${k} = ?`)
        values.push(params[k])
      }
    }

    this.wheres = `${wheres.length > 0 ? 'where' : ''} ${wheres.join(' and ')}`

    this.values = values
  }

  limit(page: number, pageSize: number) {
    const limit = `limit ${(page - 1) * pageSize},${pageSize}`

    this.limits = limit

    return this
  }

  /**
   * @template T
   * @param {T} params
   * @return {*}  {Promise<unknown>}
   * @memberof InitMysql
   */
  public insertOne<T>(params: T): Promise<unknown> {
    const keys = Object.keys(params)
    const values = Object.values(params)

    const sql = `insert ${this.table}(${keys.join()}) values(${keys.map(
      () => '?'
    )})`

    return this.conn(sql, values)
  }

  /**
   * @template T
   * @param {T} params
   * @return {*}
   * @memberof InitMysql
   */
  public deleteOne<T>(params: T) {
    this.where(params)

    const sql = `delete from ${this.table} ${this.wheres}`

    return this.conn(sql, this.values)
  }

  /**
   * @template T
   * @param {*} query
   * @param {{ $set: T }} params
   * @return {*}  {Promise<unknown>}
   * @memberof InitMysql
   */
  public updateOne<T>(query: any, params: { $set: T }): Promise<unknown> {
    const keys = Object.keys(params.$set)
    const values = Object.values(params.$set)

    this.where(query)

    const sql = `update ${this.table} set ${keys.map(e => `${e} = ?`)} ${
      this.wheres
    }`

    return this.conn(sql, [...values, ...this.values])
  }
}

export const db = (table: string) => {
  return new InitMysql(table)
}
