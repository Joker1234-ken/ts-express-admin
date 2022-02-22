class BaseError extends Error {
  code: number
  constructor(message: string | undefined) {
    super()
    this.message = message || ''
    this.code = 1001
  }
}

export default BaseError
