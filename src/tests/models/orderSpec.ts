import OrderModel from '../../models/orders.model'
const order = new OrderModel()

describe('ORDER Model', () => {
  it('should have an index method', () => {
    expect(order.createOrder).toBeDefined()
  })
  it('should have an index method', () => {
    expect(order.getOne).toBeDefined()
  })
  it('should have an index method', () => {
    expect(order.updateOne).toBeDefined()
  })
  it('should have an index method', () => {
    expect(order.getmany).toBeDefined()
  })
  it('should have an index method', () => {
    expect(order.deleteOne).toBeDefined()
  })
})
