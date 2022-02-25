import { join } from 'path'
import { compareSync, genSaltSync, hashSync } from 'bcryptjs'

export const isType = (type: string, query: any) => {
  return Object.prototype.toString.call(query).includes(type)
}

export const resolve = (dir: string) => join(__dirname, dir)

export const encrypt = (password: string) => {
  // 随机字符串
  const salt = genSaltSync(10)

  // 对明文加密
  return hashSync(password, salt)
}

export const decode = (password: string, hash: string) => {
  return compareSync(password, hash)
}
