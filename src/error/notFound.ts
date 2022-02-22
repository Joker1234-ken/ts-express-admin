class NotFound extends Error {
  code: number
  constructor() {
    super()
    this.message = '请求错误,查看请求链接或者请求方式是否错误!'
    this.code = 404
  }
}

export default NotFound
