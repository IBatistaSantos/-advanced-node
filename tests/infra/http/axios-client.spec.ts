import { HttpGetClient } from '@/infra/http'

import axios from 'axios'

jest.mock('axios')

class AxiosHttpClient {
  async get (args: HttpGetClient.Params): Promise<void> {
    await axios.get(args.url, {
      params: args.params
    })
  }
}

describe('AxiosHttpClient', () => {
  describe('get', () => {
    it('should return a promise', async () => {
      const fakeAxios = axios as jest.Mocked<typeof axios>
      const sut = new AxiosHttpClient()

      await sut.get({
        url: 'any_url',
        params: {
          any_param: 'any_value'
        }
      })

      expect(fakeAxios.get).toHaveBeenCalledWith('any_url', {
        params: {
          any_param: 'any_value'
        }
      })

      expect(fakeAxios.get).toHaveBeenCalledTimes(1)
    })
  })
})
