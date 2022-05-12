
import PgUser from '@/infra/postgres/entities/user'
import PgUserAccountRepository from '@/infra/postgres/repos/user-account'

import { IBackup } from 'pg-mem'
import { getConnection, Repository } from 'typeorm'
import { makeFakeDb } from '../mocks'

describe('PgUserAccount', () => {
  describe('load', () => {
    let sut: PgUserAccountRepository
    let pgUserRepo: Repository<PgUser>
    let backup: IBackup

    beforeEach(() => {
      sut = new PgUserAccountRepository()
    })

    beforeAll(async () => {
      const db = await makeFakeDb([PgUser])
      backup = db.backup()
      pgUserRepo = getConnection().getRepository(PgUser)
    })

    afterAll(async () => {
      backup.restore()
      await getConnection().close()
    })

    it('should return an account if email exists', async () => {
      await pgUserRepo.save({ email: 'existing_email' })

      const account = await sut.load({ email: 'existing_email' })

      expect(account).toEqual({ id: '1' })
    })

    it('should return undefined if email not exists', async () => {
      const account = await sut.load({ email: 'not_existing_email' })
      expect(account).toBeUndefined()
    })
  })
})
