import OrderModel from '../../models/orders.model'
import UserModel from '../../models/user.model'
import db from '../../database'
const order = new OrderModel()
const user = new UserModel()
const date = new Date(2022, 10, 10)

describe('ORDER Model', () => {
  it('should have an createOrder method', () => {
    expect(order.createOrder).toBeDefined()
  })
  it('should have an getOne method', () => {
    expect(order.getOne).toBeDefined()
  })
  it('should have an UpdateOne method', () => {
    expect(order.updateOne).toBeDefined()
  })
  it('should have an getMany method', () => {
    expect(order.getmany).toBeDefined()
  })
  it('should have an deleteOne method', () => {
    expect(order.deleteOne).toBeDefined()
  })
  describe('ORDER Model ACTIONS', () => {
    beforeEach(async () => {
      await user.createUser({
        first_name: 'sherif',
        last_name: 'elshamaa',
        email: 'sherif@2test.com',
        password: '123456'
      })
      await order.createOrder({
        user_id: 1,
        status: 'created',
        order_date: date
      })
    })

    afterEach(async () => {
      const connection = await db.connect()
      await connection.query(
        'DELETE FROM users; ALTER SEQUENCE users_user_id_seq RESTART WITH 1; DELETE FROM orders; ALTER SEQUENCE orders_order_id_seq RESTART WITH 1; '
      )
      connection.release()
    })

    it('should create a order', async () => {
      const result = await order.createOrder({
        user_id: 1,
        status: 'created',
        order_date: date
      })
      expect(result).toEqual({
        user_id: 1,
        order_id: result.order_id,
        status: 'created',
        order_date: result.order_date
      })
    })

    it('should return a list of orders', async () => {
      const result = await order.getmany()
      expect(result.length).toBe(1)
    })

    it('should return the correct order', async () => {
      const result = await order.getOne('1')
      expect(result).toEqual({
        user_id: 1,
        order_id: 1,
        status: 'created',
        order_date: result.order_date
      })
    })

    it('should update a order', async () => {
      const result = await order.updateOne({
        user_id: 1,
        order_id: 1,
        status: 'delivered',
        order_date: date
      })
      expect(result).toEqual({
        user_id: 1,
        order_id: 1,
        status: 'delivered',
        order_date: result.order_date
      })
    })

    it('delete method should remove the order', async () => {
      const result = await order.deleteOne('1')

      expect(result.order_id).toEqual(1)
    })
  })
})
