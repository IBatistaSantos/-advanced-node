export class ServerError extends Error {
  constructor (error?: Error) {
    super('Server failded. Try again soon')
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}
