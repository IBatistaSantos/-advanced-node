import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'usuarios' })
export default class PgUser {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  email!: string

  @Column({ name: 'nome', nullable: true })
  name?: string

  @Column({ name: 'id_facebook', nullable: true })
  facebookId?: string
}
