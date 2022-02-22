class MysqlError extends Error {
  code: number
  constructor(message: string | undefined) {
    super()
    this.message = message || '数据库错误'
    this.code = 1000
  }
}

export default MysqlError
