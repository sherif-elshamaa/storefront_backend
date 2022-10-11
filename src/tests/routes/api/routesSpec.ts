import supertest from 'supertest'
import app from '../../../index'
import db from '../../../database'
import UserModel from '../../../models/user.model'
import ProductModel from '../../../models/products.model'
import OrderModel from '../../../models/orders.model'
const user = new UserModel()
const product = new ProductModel()
const order = new OrderModel()
const date = new Date(2022, 10, 10)

const req = supertest(app)
let token = ''

describe('Testing endpoints', () => {
  beforeAll(async () => {
    await user.createUser({
      first_name: 'sherif',
      last_name: 'elshamaa',
      email: 'sherif@test.com',
      password: '123456'
    })
    await product.createProduct({
      name: 'product',
      price: 50,
      quantity: 1,
      category: 'category'
    })
    await order.createOrder({
      user_id: 1,
      status: 'created'
    })
  })
  afterAll(async () => {
    const connection = await db.connect()
    await connection.query(
      ` DELETE FROM users;
        ALTER SEQUENCE users_user_id_seq RESTART WITH 1;
        DELETE FROM product;
        ALTER SEQUENCE product_product_id_seq RESTART WITH 1;
        DELETE FROM orders; 
        ALTER SEQUENCE orders_order_id_seq RESTART WITH 1;
        DELETE FROM orders_products; 
        ALTER SEQUENCE orders_products_id_seq RESTART WITH 1; 
      `
    )
    connection.release()
  })

  describe('Testing users endpoints', () => {
    it('get /api/user/create should create user status code 200', async () => {
      const res = await req.post('/api/user/create').set('Content-Type', 'application/json').send({
        first_name: 'sherif',
        last_name: 'elshamaa',
        email: 'sherif1@test.com',
        password: '123456'
      })
      const { data } = res.body
      expect(res.status).toBe(200)
      expect(data.first_name).toBe('sherif')
      expect(data.last_name).toBe('elshamaa')
      expect(data.email).toBe('sherif1@test.com')
    })

    it('get /api/user/login should login & create user token status code 200', async () => {
      const res = await req.get('/api/user/login').set('Content-Type', 'application/json').send({
        email: 'sherif@test.com',
        password: '123456'
      })
      const { data } = res.body
      token = data.token
      expect(res.status).toBe(200)
      expect(data.email).toBe('sherif@test.com')
    })

    it('get /api/user/get/:id should return user status code 200', async () => {
      const res = await req
        .get('/api/user/get/1')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      const { data } = res.body
      expect(res.status).toBe(200)
      expect(data.first_name).toBe('sherif')
      expect(data.last_name).toBe('elshamaa')
      expect(data.email).toBe('sherif@test.com')
    })

    it('get /api/user/getall should return 2 user status code 200', async () => {
      const res = await req
        .get('/api/user/getall')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      const { data } = res.body
      expect(res.status).toBe(200)
      expect(data.length).toBe(2)
    })

    it('get /api/user/update should update user status code 200', async () => {
      const res = await req
        .put('/api/user/update')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          first_name: 'ahmed',
          last_name: 'elshamaa',
          email: 'sherif55@test.com',
          password: '123456',
          user_id: '1'
        })
      const { data } = res.body
      expect(res.status).toBe(200)
      expect(data.first_name).toBe('ahmed')
      expect(data.last_name).toBe('elshamaa')
      expect(data.email).toBe('sherif55@test.com')
    })

    it('get /api/user/delete/:id should remove 1 user status code 200', async () => {
      const res = await req
        .delete('/api/user/delete/1')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      const { data } = res.body
      expect(res.status).toBe(200)
      expect(data.user_id).toEqual(1)
    })
  })
  describe('Testing products endpoints', () => {
    it('get /api/product/create should create product status code 200', async () => {
      const res = await req
        .post('/api/product/create')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'product1',
          price: 540,
          quantity: 11,
          category: 'category1'
        })
      const { data } = res.body
      expect(res.status).toBe(200)
      expect(data.name).toBe('product1')
      expect(data.price).toBe(540)
      expect(data.quantity).toBe(11)
      expect(data.category).toBe('category1')
    })

    it('get /api/product/get/:id should return product status code 200', async () => {
      const res = await req
        .get('/api/product/get/1')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      const { data } = res.body
      expect(res.status).toBe(200)
      expect(data.name).toBe('product')
      expect(data.price).toBe(50)
      expect(data.quantity).toBe(1)
      expect(data.category).toBe('category')
    })

    it('get /api/product/getall should return 2 products status code 200', async () => {
      const res = await req
        .get('/api/product/getall')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      const { data } = res.body
      expect(res.status).toBe(200)
      expect(data.length).toBe(2)
    })

    it('get /api/product/update should update product status code 200', async () => {
      const res = await req
        .put('/api/product/update')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'product',
          price: 500,
          quantity: 110,
          category: 'category',
          product_id: 1
        })
      const { data } = res.body
      expect(res.status).toBe(200)
      expect(data.name).toBe('product')
      expect(data.price).toBe(500)
      expect(data.quantity).toBe(110)
      expect(data.category).toBe('category')
    })

    it('get /api/product/delete/:id should remove 1 product status code 200', async () => {
      const res = await req
        .delete('/api/product/delete/1')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      const { data } = res.body
      expect(res.status).toBe(200)
      expect(data.product_id).toEqual(1)
    })
  })
  describe('Testing orders endpoints', () => {
    it('get /api/order/create should create order status code 200', async () => {
      const res = await req
        .post('/api/order/create')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          status: 'created',
          user_id: 2
        })
      const { data } = res.body
      expect(res.status).toBe(200)
      expect(data.status).toBe('created')
    })

    it('get /api/order/get/:id should return order status code 200', async () => {
      const res = await req
        .get('/api/order/get/2')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      const { data } = res.body
      expect(res.status).toBe(200)
      expect(data.user_id).toBe(2)
      expect(data.status).toBe('created')
    })

    it('get /api/order/getall should return 2 orders status code 200', async () => {
      const res = await req
        .get('/api/order/getall')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      const { data } = res.body
      expect(res.status).toBe(200)
      expect(data.length).toBe(2)
    })

    it('get /api/order/update should update order status code 200', async () => {
      const res = await req
        .put('/api/order/update')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          order_id: 1,
          status: 'delevierd',
          order_date: date
        })
      const { data } = res.body
      expect(res.status).toBe(200)
      expect(data.order_id).toBe(1)
      expect(data.status).toBe('delevierd')
    })

    it('get /api/order/delete/:id should remove 1 order status code 200', async () => {
      const res = await req
        .delete('/api/order/delete/1')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      const { data } = res.body
      expect(res.status).toBe(200)
      expect(data.order_id).toEqual(1)
    })
  })
})
