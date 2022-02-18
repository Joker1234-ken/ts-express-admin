import express, { Express } from 'express'

const app: Express = express()

app.use((req, res) => {
  res.send('welcome to my node server')
})

app.listen(8088, () => {
  console.log('http://localhost:8088')
})
