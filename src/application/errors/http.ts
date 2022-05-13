export class ServerError extends Error {
  constructor (error?: Error) {
    super('Server failded. Try again soon')
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}

export class RequiredFieldError extends Error {
  constructor (fielName: string) {
    super(`The field ${fielName} is required`)
    this.name = 'RequiredFieldError'
  }
}

export class UnauthorizedError extends Error {
  constructor () {
    super('UnauthorizedError')
    this.name = 'UnauthorizedError'
  }
}
