import { RequiredFieldError } from '@/application/errors'

describe('RequiredStringValidator', () => {
  it('should return RequiredFieldError if value is empty', () => {
    const sut = new RequiredStringValidator('', 'any_field')
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('should return RequiredFieldError if value is null', () => {
    const sut = new RequiredStringValidator(null as any, 'any_field')
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('should return RequiredFieldError if value is undefined', () => {
    const sut = new RequiredStringValidator(undefined as any, 'any_field')
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError('any_field'))
  })
})

class RequiredStringValidator {
  constructor (
    private readonly value: string,
    private readonly fieldName: string
  ) {}

  validate (value: string): Error | undefined {
    return new RequiredFieldError('any_field')
  }
}
