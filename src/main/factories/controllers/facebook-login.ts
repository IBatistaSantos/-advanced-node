import { FacebookLoginController } from '@/application/controllers'
import { makeFacebookAuthenticationService } from '@/main/factories/services'

export const makeFacebookLoginCotroller = (): FacebookLoginController => {
  const fbAuthenticationService = makeFacebookAuthenticationService()
  return new FacebookLoginController(fbAuthenticationService)
}
