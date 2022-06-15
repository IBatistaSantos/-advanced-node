import axios from 'axios'
import { HttpGetClient } from './client'

type Params = HttpGetClient.Params
export class AxiosHttpClient implements HttpGetClient {
  async get ({ url, params }: Params): Promise<any> {
    const result = await axios.get(url, { params })
    return result.data
  }
}
