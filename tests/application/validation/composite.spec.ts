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

  it('should return the first error', () => {
    validator.validate.mockReturnValueOnce(new Error('error_1'))
    validatorTwo.validate.mockReturnValueOnce(new Error('error_2'))

    sut = new ValidationComposite(validators)
    const error = sut.validate()

    expect(error).toEqual(new Error('error_1'))
  })
})

interface Validator {
  validate: () => Error | undefined
}

class ValidationComposite implements Validator {
  constructor (private readonly validators: Validator[]) {}

  validate (): undefined | Error {
    for (const validator of this.validators) {
      const error = validator.validate()

      if (error !== undefined) {
        return error
      }
    }
    return undefined
  }
}