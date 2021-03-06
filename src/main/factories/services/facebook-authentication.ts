import { FacebookAuthenticationService } from '@/data/services'

import { makeFacebookApi } from '@/main/factories/apis'
import { makePgUserAccountRepo } from '@/main/factories/repos'
import { makeJwtTokenGenerator } from '@/main/factories/crypto'

export const makeFacebookAuthenticationService = (): FacebookAuthenticationService => {
  const userAccountRepo = makePgUserAccountRepo()
  const fbApi = makeFacebookApi()
  const jwtTokenGenerator = makeJwtTokenGenerator()
  return new FacebookAuthenticationService(fbApi, userAccountRepo, jwtTokenGenerator)
}
