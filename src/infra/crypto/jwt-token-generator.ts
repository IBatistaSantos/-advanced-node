import { sign } from 'jsonwebtoken'
import { TokenGenerator } from '@/data/contracts/crypto'

type TokenParams = TokenGenerator.Params
type TokenResult = TokenGenerator.Result
export class JwtTokenGenerator implements TokenGenerator {
  constructor (private readonly secret: string) {}
  async generateToken ({ expirationInMs, key }: TokenParams): Promise<TokenResult> {
    const expirationInSeconds = expirationInMs / 1000
    return sign({ key }, this.secret, { expiresIn: expirationInSeconds })
  }
}
