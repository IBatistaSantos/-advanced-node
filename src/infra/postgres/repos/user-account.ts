import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/data/contracts/repos'
import { getConnection } from 'typeorm'
import PgUser from '../entities/user'

export default class PgUserAccountRepository implements LoadUserAccountRepository {
  private readonly pgUserRepo = getConnection().getRepository(PgUser)

  async saveWithFacebook (params: SaveFacebookAccountRepository.Params): Promise<void> {
    if (params.id === undefined) {
      await this.pgUserRepo.save({
        name: params.name,
        email: params.email,
        facebookId: params.facebookId
      })
    } else {
      await this.pgUserRepo.update(parseInt(params.id), {
        name: params.name,
        facebookId: params.facebookId
      })
    }
  }

  async load (params: LoadUserAccountRepository.Params): Promise<LoadUserAccountRepository.Result> {
    const pgUser = await this.pgUserRepo.findOne({ where: { email: params.email } })

    if (pgUser !== undefined) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined
      }
    }
  }
}
