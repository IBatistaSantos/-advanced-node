import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'
import { LoadFacebookUserApi } from '../contracts/apis'
import { CreateFacebookAccountRepository, LoadUserAccountRepository, UpdateFacebookAccountRepository } from '../contracts/repos'

export class FacebookAuthenticationService {
  constructor (
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly userAccountRepository: LoadUserAccountRepository & CreateFacebookAccountRepository & UpdateFacebookAccountRepository
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const fbData = await this.facebookApi.loadUser({ token: params.token })

    if (fbData !== undefined) {
      const accountData = await this.userAccountRepository.load({ email: fbData?.email })

      if (accountData !== undefined) {
        await this.userAccountRepository.updateWithFacebook({
          id: accountData.id,
          name: fbData.name,
          facebookId: fbData.facebookId
        })
      } else {
        await this.userAccountRepository.createFromFacebook({
          email: fbData.email,
          name: fbData.name,
          facebookId: fbData.facebookId
        })
      }
    }
    return new AuthenticationError()
  }
}
