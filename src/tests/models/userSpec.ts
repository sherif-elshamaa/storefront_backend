import UserModel from '../../models/user.model'
const user = new UserModel()
import db from '../../database'

describe('USER Model', () => {
  it('should have an index method', () => {
    expect(user.getmany).toBeDefined()
  })

  describe('USER Model ACTIONS', () => {
    beforeEach(async () => {
      await user.createUser({
        first_name: 'sherif',
        last_name: 'elshamaa',
        email: 'sherif@test.com',
        password: '123456'
      })
    })
    afterEach(async () => {
      const connection = await db.connect()
      await connection.query('DELETE FROM users; ALTER SEQUENCE users_user_id_seq RESTART WITH 1;')
      connection.release()
    })

    it('should create a user', async () => {
      const result = await user.createUser({
        first_name: 'sherif',
        last_name: 'elshamaa',
        email: 'sherif2@test.com',
        password: '123456'
      })
      expect(result).toEqual({
        user_id: result.user_id,
        first_name: 'sherif',
        last_name: 'elshamaa',
        email: 'sherif2@test.com'
      })
    })

    it('index method should return a list of users', async () => {
      const result = await user.getmany()
      expect(result.length).toBe(1)
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
      const result = await user.deleteOne('1')

      expect(result.user_id).toEqual(1)
    })
  })
})
