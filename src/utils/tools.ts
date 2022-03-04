import { secret } from './../config/setting'
import { join } from 'path'
import { compareSync, genSaltSync, hashSync } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { getLogger } from 'log4js'

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
  return sign({ payload }, secret, {
    expiresIn: '1h'
  })
}

// 创建日志
export const log4js = (message: string) => {
  const logger = getLogger()

  logger.level = 'info'

  logger.info(message)
}

export const getDay = (date?: Date | number) => {
  const now = date ? new Date(date) : new Date()

  const year: number = now.getFullYear()
  let month: number | string = now.getMonth() + 1
  month = month < 10 ? `0${month}` : month
  let day: number | string = now.getDate()
  day = day < 10 ? `0${day}` : day

  return `${year}-${month}-${day}`
}

export const getTime = (date?: Date | number) => {
  const now = date ? new Date(date) : new Date()

  let hours: number | string = now.getHours()
  hours = hours < 10 ? `0${hours}` : hours
  let minutes: number | string = now.getMinutes()
  minutes = minutes < 10 ? `0${minutes}` : minutes
  let seconds: number | string = now.getSeconds()
  seconds = seconds < 10 ? `0${seconds}` : seconds

  return `${hours}:${minutes}:${seconds}`
}
