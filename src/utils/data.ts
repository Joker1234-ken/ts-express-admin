class JSONResponse {
  code: number
  message: string
  data: any
  constructor(data?: any, message?: string, code?: number) {
    this.data = data || null
    this.code = code || 0
    this.message = message || 'ok'
  }

  setData(data?: any | any[]) {
    this.data = data || null
  }

  setCode(code?: number) {
    this.code = code || 0
  }

  setMessage(message?: string) {
    this.message = message || 'ok'
  }
}

export default JSONResponse
