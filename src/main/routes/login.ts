
import { Router } from 'express'
import { makeFacebookLoginCotroller } from '@/main/factories/controllers'
import { adaptExpressRouter as adapt } from '@/infra/http'

export default (router: Router): void => {
  router.get('/login/facebook', adapt(makeFacebookLoginCotroller()))
}
