import BaseError from './BaseError'
class NotFound extends BaseError {
  constructor() {
    super('请求错误,查看请求链接或者请求方式是否错误!', 404)
  }
}

export default NotFound
