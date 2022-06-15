import cors from 'cors'
import { Express, json } from 'express'

export const setupMiddleware = (app: Express): void => {
  app.use(cors())
  app.use(json())
  app.use((_, res, next) => {
    res.type('json')
    next()
  })
}
