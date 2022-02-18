import express, { Express } from 'express'

const app: Express = express()

// 解析express request body参数
app.use(express.json(), express.urlencoded({ extended: false }))

app.listen(8088, () => {
  console.log('http://localhost:8088')
})
