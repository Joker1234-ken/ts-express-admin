class Response {
  code: number = 0
  message: string = 'ok'
  data: any
  constructor(data?: any) {
    this.data = data
  }
}

export const apiResponse = (data?: any) => {
  return new Response(data)
}
