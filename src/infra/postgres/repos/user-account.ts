import { LoadUserAccountRepository } from '@/data/contracts/repos'
import { getConnection } from 'typeorm'
import PgUser from '../entities/user'

export default class PgUserAccountRepository implements LoadUserAccountRepository {
  async load (params: LoadUserAccountRepository.Params): Promise<LoadUserAccountRepository.Result> {
    const pgUser = await getConnection().getRepository(PgUser).findOne({ where: { email: params.email } })

    if (pgUser !== undefined) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined
      }
    }
  }
}
