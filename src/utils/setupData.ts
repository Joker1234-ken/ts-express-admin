export class BaseError extends Error {
  code: number
  constructor(message: string, code: number) {
    super()
    this.message = message
    this.code = code
  }
}

export const error = (message: string = '服务器错误', code: number = 1001) => {
  return new BaseError(message, code)
}

export class Response {
  code: number = 0
  message: string = 'ok'
  data: any
  constructor(data?: any) {
    this.data = data
  }
}

export const responseData = (data?: any) => {
  return new Response(data)
}
