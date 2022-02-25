import express from 'express'
import { check, ValidationError, validationResult } from 'express-validator'
import BaseError from './../error/BaseError'
import { isType } from './../utils/tools'

export const validator = (valid: any, validList: any[] = []): any[] => {
  const initCheck = (key: string) => check(key).exists().withMessage('为必填项')

  for (const key in valid) {
    if (valid[key] === 'string') {
      validList.push(
        initCheck(key)
          .isString()
          .withMessage('类型为字符串')
          .toLowerCase()
          .trim()
      )
    } else if (valid[key] === 'number') {
      validList.push(
        initCheck(key)
          .custom(value => isType('Number', value))
          .withMessage('类型为数值')
      )
    } else if (valid[key] === 'array') {
      validList.push(initCheck(key).isArray().withMessage('类型为数组'))
    } else if (valid[key] === 'object') {
      validList.push(initCheck(key).isObject().withMessage('类型为对象'))
    }
  }

  return [
    ...validList,
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const errorFormatter = ({ msg, param }: ValidationError) => {
        // Build your resulting errors however you want! String, object, whatever - it works!
        return `${param} ${msg}`
      }

      const errors = validationResult(req).formatWith(errorFormatter)

      if (!errors.isEmpty()) {
        return next(new BaseError(errors.array()[0], 400))
      }

      next()
    }
  ]
}
