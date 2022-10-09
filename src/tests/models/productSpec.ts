import ProductModel from '../../models/products.model'
const product = new ProductModel()

describe('product Model', () => {
  it('should have an index method', () => {
    expect(product.createProduct).toBeDefined()
  })
  it('should have an index method', () => {
    expect(product.getOne).toBeDefined()
  })
  it('should have an index method', () => {
    expect(product.updateOne).toBeDefined()
  })
  it('should have an index method', () => {
    expect(product.getmany).toBeDefined()
  })
  it('should have an index method', () => {
    expect(product.deleteOne).toBeDefined()
  })
})
