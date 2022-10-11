import OrderProductModel from '../../models/orderProduct.model'
import ProductModel from '../../models/products.model'
import OrderModel from '../../models/orders.model'
import UserModel from '../../models/user.model'
import db from '../../database'
const orderProduct = new OrderProductModel()
const order = new OrderModel()
const user = new UserModel()
const product = new ProductModel()
const date = new Date(2022, 9, 10)

describe('orderProduct Model', () => {
  it('should have an createOrderProduct method', () => {
    expect(orderProduct.createOrderProduct).toBeDefined()
  })
  it('should have an getOrderProduct method', () => {
    expect(orderProduct.getOrderProduct).toBeDefined()
  })
  it('should have an getTopFive method', () => {
    expect(orderProduct.getTopFive).toBeDefined()
  })

  describe('orderProduct Model ACTIONS', () => {
    beforeEach(async () => {
      await user.createUser({
        first_name: 'sherif',
        last_name: 'elshamaa',
        email: 'sherif4@test.com',
        password: '123456'
      })
      await order.createOrder({
        user_id: 1,
        status: 'created',
        order_date: date
      })
      await product.createProduct({
        name: 'product1',
        price: 5,
        quantity: 10,
        category: 'categroy1'
      })
    })

    afterEach(async () => {
      const connection = await db.connect()
      await connection.query(
        `DELETE FROM orders_products; 
        ALTER SEQUENCE orders_products_id_seq RESTART WITH 1; 
        DELETE FROM users; 
        ALTER SEQUENCE users_user_id_seq RESTART WITH 1; 
        DELETE FROM product; 
        ALTER SEQUENCE product_product_id_seq RESTART WITH 1;`
      )
      connection.release()
    })

    it('should create a product', async () => {
      const result = await orderProduct.createOrderProduct(
        [{ product_id: 1, quantity: 1, order_id: 1 }],
        '1'
      )

      expect(result).toEqual([
        {
          id: 1,
          order_id: 1,
          product_id: 1,
          quantity: 1
        }
      ])
    })

    it('should return a list of products', async () => {
      const result = await orderProduct.getOrderProduct('1')
      expect(result.length).toBe(1)
    })
  })
})
