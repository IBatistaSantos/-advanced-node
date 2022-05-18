import { FacebookApi } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http'
import { env } from '@/main/config/env'
describe('Facebook Api Integration Tests', () => {
  let sut: FacebookApi
  let axiosClient: AxiosHttpClient
  let token: string

  beforeAll(() => {
    token = 'EAAU4GeuDoZCkBAK433dV89O9WLPjeMtVv4X4d2L4PIwXjqukapsIiEK2wAdxDZAUKBzpEAWNRK2XV9ZBbzIeMN1E2YAxWAHmuNNpvZBZBoS53pdoQyIY26BmfDjKyHCUIexDTOIG6ZBI0jt9ZAgM6sOxXtQG4MvEuuz1ZCMP3G5f6eWI8fLcUknCzOXDKzhAz22Yvyx632PvMQZDZD'
  })

  beforeEach(() => {
    axiosClient = new AxiosHttpClient()
    sut = new FacebookApi(axiosClient, env.facebookApi.clientId, env.facebookApi.clientSecret)
  })

  it('should return a Facebook User if token is valid ', async () => {
    const fbUser = await sut.loadUser({ token })

    expect(fbUser).toEqual({
      facebookId: '115758027801044',
      name: 'User Test',
      email: 'user_cklehxn_test@tfbnw.net'
    })
  })

  it('should return undefined if token is invalid ', async () => {
    const fbUser = await sut.loadUser({ token: 'token_invalid' })

    expect(fbUser).toBeUndefined()
  })
})
