import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/data/contracts/repos'
import { getConnection } from 'typeorm'
import PgUser from '../entities/user'

export default class PgUserAccountRepository implements LoadUserAccountRepository {
  async saveWithFacebook (params: SaveFacebookAccountRepository.Params): Promise<void> {
    const pgUserRepo = getConnection().getRepository(PgUser)

    await pgUserRepo.save({
      name: params.name,
      email: params.email,
      facebookId: params.facebookId
    })
  }

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
