import { LoadUserAccountRepository } from '@/data/contracts/repos'
import { newDb } from 'pg-mem'
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

describe('Pg', () => {
  describe('Load', () => {
    it('should return an account if email exists', async () => {
      const sut = new PgUserAccountRepository()
      const account = await sut.load({ email: 'existing_email' })
      expect(account).toEqual({ id: '1' })
    })
  })
})

class PgUserAccountRepository implements LoadUserAccountRepository {
  async load (params: LoadUserAccountRepository.Params): Promise<LoadUserAccountRepository.Result> {
    const db = newDb()
    const connection = await db.adapters.createTypeormConnection({
      type: 'postgres',
      entities: [PgUser]
    })

    await connection.synchronize()
    const pgUserRepo = connection.getRepository(PgUser)
    await pgUserRepo.save({ email: 'existing_email' })
    const pgUser = await pgUserRepo.findOne({ where: { email: params.email } })

    if (pgUser !== undefined) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined
      }
    }
  }
}

@Entity({ name: 'usuarios' })
class PgUser {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  email!: string

  @Column({ name: 'nome', nullable: true })
  name?: string

  @Column({ name: 'id_facebook', nullable: true })
  facebookId?: string
}
