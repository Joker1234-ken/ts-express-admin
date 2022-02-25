import { autoLoader } from './middleware/autoLoader'
import express, { Express } from 'express'
import { setupError } from './middleware/error'
import { resolve } from './utils/tools'

const app: Express = express()

// 解析express request body参数
app.use(express.json(), express.urlencoded({ extended: false }))

// 路由自动加载
autoLoader(app, resolve('../controllers'))

// 错误处理
setupError(app)

app.listen(8088, () => {
  console.log('http://localhost:8088')
})
