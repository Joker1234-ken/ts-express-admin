class BaseError extends Error {
  code: number
  constructor(message?: string, code?: number) {
    super()
    this.message = message || '服务器错误'
    this.code = code || 500
  }
}

export default BaseError
