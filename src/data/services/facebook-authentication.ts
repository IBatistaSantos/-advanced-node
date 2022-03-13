import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'
import { LoadFacebookUserApi } from '../contracts/apis'
import { CreateFacebookAccountRepository, LoadUserAccountRepository } from '../contracts/repos'

export class FacebookAuthenticationService {
  constructor (
    private readonly loadFacebookUserApi: LoadFacebookUserApi,
    private readonly loadUserAccountRepo: LoadUserAccountRepository,
    private readonly createFacebookAccountRepo: CreateFacebookAccountRepository
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const fbData = await this.loadFacebookUserApi.loadUser({ token: params.token })

    if (fbData !== undefined) {
      await this.loadUserAccountRepo.load({ email: fbData?.email })
      await this.createFacebookAccountRepo.createFromFacebook({
        email: fbData.email,
        name: fbData.name,
        facebookId: fbData.facebookId
      })
    }
    return new AuthenticationError()
  }
}
