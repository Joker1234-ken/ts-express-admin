import BaseError from './BaseError'
class MysqlError extends BaseError {
  constructor(message: string | undefined) {
    super(message || '数据库错误', 1000)
  }
}

export default MysqlError
