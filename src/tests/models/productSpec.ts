import ProductModel from '../../models/products.model'
const product = new ProductModel()

describe('product Model', () => {
  it('should have an index method', () => {
    expect(product.getmany).toBeDefined()
  })
})
