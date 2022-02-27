import { secret } from './../config/setting'
import { join } from 'path'
import { compareSync, genSaltSync, hashSync } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

// 判断类型
export const isType = (type: string, query: any) => {
  return Object.prototype.toString.call(query).includes(type)
}

// 获取文件绝对地址
export const resolve = (dir: string) => join(__dirname, dir)

// bcrypt加密
export const encrypt = (password: string) => {
  // 随机字符串
  const salt = genSaltSync(10)

  // 对明文加密
  return hashSync(password, salt)
}

// bcrypt解密
export const decode = (password: string, hash: string) => {
  return compareSync(password, hash)
}

// 创建token
export const createToken = (payload: any) => {
  sign({ payload }, secret, {
    expiresIn: '1h'
  })
}
