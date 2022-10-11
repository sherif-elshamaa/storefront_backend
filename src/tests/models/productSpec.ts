import ProductModel from '../../models/products.model'
const product = new ProductModel()
import db from '../../database'

describe('product Model', () => {
  it('should have an createProduct method', () => {
    expect(product.createProduct).toBeDefined()
  })
  it('should have an getOne method', () => {
    expect(product.getOne).toBeDefined()
  })
  it('should have an updateOne method', () => {
    expect(product.updateOne).toBeDefined()
  })
  it('should have an getMany method', () => {
    expect(product.getmany).toBeDefined()
  })
  it('should have an deleteOne method', () => {
    expect(product.deleteOne).toBeDefined()
  })
  describe('product Model ACTIONS', () => {
    beforeEach(async () => {
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
        'DELETE FROM product; ALTER SEQUENCE product_product_id_seq RESTART WITH 1;'
      )
      connection.release()
    })

    it('should create a product', async () => {
      const result = await product.createProduct({
        name: 'product1',
        price: 5,
        quantity: 10,
        category: 'categroy1'
      })
      expect(result).toEqual({
        product_id: result.product_id,
        name: 'product1',
        price: 5,
        quantity: 10,
        category: 'categroy1'
      })
    })

    it('should return a list of products', async () => {
      const result = await product.getmany()
      expect(result.length).toBe(1)
    })

    it('should return the correct product', async () => {
      const result = await product.getOne('1')
      expect(result).toEqual({
        name: 'product1',
        price: 5,
        quantity: 10,
        category: 'categroy1',
        product_id: 1
      })
    })

    it('should update a product', async () => {
      const result = await product.updateOne({
        name: 'product1',
        price: 5,
        quantity: 15,
        category: 'categroy1',
        product_id: 1
      })
      expect(result).toEqual({
        name: 'product1',
        price: 5,
        quantity: 15,
        category: 'categroy1',
        product_id: 1
      })
    })

    it('delete method should remove the product', async () => {
      const result = await product.deleteOne('1')

      expect(result.product_id).toEqual(1)
    })
  })
})
