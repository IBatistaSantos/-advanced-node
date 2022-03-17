import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'
import { LoadFacebookUserApi } from '../contracts/apis'
import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '../contracts/repos'

export class FacebookAuthenticationService {
  constructor (
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly userAccountRepository: LoadUserAccountRepository & SaveFacebookAccountRepository
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const fbData = await this.facebookApi.loadUser({ token: params.token })

    if (fbData !== undefined) {
      const accountData = await this.userAccountRepository.load({ email: fbData?.email })

      await this.userAccountRepository.saveWithFacebook({
        id: accountData?.id,
        name: accountData?.name ?? fbData.name,
        facebookId: fbData.facebookId,
        email: fbData.email
      })
    }
    return new AuthenticationError()
  }
}
