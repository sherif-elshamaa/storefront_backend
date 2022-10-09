import OrderProductModel from '../../models/orderProduct.model'
const orderProduct = new OrderProductModel()

describe('orderProduct Model', () => {
  it('should have an index method', () => {
    expect(orderProduct.createOrderProduct).toBeDefined()
  })
  it('should have an index method', () => {
    expect(orderProduct.getOrderProduct).toBeDefined()
  })
  it('should have an index method', () => {
    expect(orderProduct.getTopFive).toBeDefined()
  })
})
