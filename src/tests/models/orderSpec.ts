import OrderModel from '../../models/orders.model'
const order = new OrderModel()

describe('ORDER Model', () => {
  it('should have an index method', () => {
    expect(order.getmany).toBeDefined()
  })
})
