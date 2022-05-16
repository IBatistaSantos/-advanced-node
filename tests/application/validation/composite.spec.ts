import { mock, MockProxy } from 'jest-mock-extended'

describe('ValidationComposite', () => {
  let sut: ValidationComposite
  let validator: MockProxy<Validator>
  let validatorTwo: MockProxy<Validator>
  let validators: Validator[]

  beforeAll(() => {
    validator = mock()
    validatorTwo = mock()

    validators = [validator, validatorTwo]
    validator.validate.mockReturnValue(undefined)
    validatorTwo.validate.mockReturnValue(undefined)
  })
  beforeEach(() => {
    sut = new ValidationComposite(validators)
  })
  it('should return undefined if all Validators return undefined', () => {
    sut = new ValidationComposite(validators)
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
