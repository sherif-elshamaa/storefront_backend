import UserModel from '../../models/user.model'
const user = new UserModel()

describe('USER Model', () => {
  it('should have an index method', () => {
    expect(user.getmany).toBeDefined()
  })

  it('should create a user', async () => {
    const result = await user.createUser({
      first_name: 'sherif',
      last_name: 'elshamaa',
      email: 'sherif@test.com',
      password: '123456'
    })
    expect(result).toEqual({
      user_id: 1,
      first_name: 'sherif',
      last_name: 'elshamaa',
      email: 'sherif@test.com'
    })
  })

  it('index method should return a list of users', async () => {
    const result = await user.getmany()
    expect(result).toEqual([
      {
        user_id: 1,
        first_name: 'sherif',
        last_name: 'elshamaa',
        email: 'sherif@test.com'
      }
    ])
  })

  it('show method should return the correct user', async () => {
    const result = await user.getOne('1')
    expect(result).toEqual({
      user_id: 1,
      first_name: 'sherif',
      last_name: 'elshamaa',
      email: 'sherif@test.com'
    })
  })

  it('should update a user', async () => {
    const result = await user.updateOne({
      first_name: 'ahmed',
      last_name: 'elshamaa',
      email: 'sherif@test.com',
      password: '123456',
      user_id: 1
    })
    expect(result).toEqual({
      user_id: 1,
      first_name: 'ahmed',
      last_name: 'elshamaa',
      email: 'sherif@test.com'
    })
  })

  it('delete method should remove the user', async () => {
    user.deleteOne('1')
    const result = await user.getmany()

    expect(result).toEqual([])
  })
})
