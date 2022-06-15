import express from 'express'

import { setupMiddleware } from './middlewares'
import { setupRouter } from './routes'

const app = express()

setupMiddleware(app)
setupRouter(app)

export { app }
