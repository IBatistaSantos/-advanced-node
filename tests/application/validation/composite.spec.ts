import { mock } from 'jest-mock-extended'

describe('ValidationComposite', () => {
  it('should return undefined if all Validators return undefined', () => {
    const validator = mock<Validator>()
    validator.validate.mockReturnValue(undefined)
    const validatorTwo = mock<Validator>()
    validatorTwo.validate.mockReturnValue(undefined)

    const validators = [validator, validatorTwo]

    const sut = new ValidationComposite(validators)
    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})

interface Validator {
  validate: () => Error | undefined
}

class ValidationComposite {
  constructor (private readonly validators: Validator[]) {}

  validate (): undefined {
    this.validators.forEach(validator => {
      validator.validate()
    })

    return undefined
  }
}
