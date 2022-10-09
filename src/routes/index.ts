import express from 'express'
import usersRouters from './api/users.routes'
import productsRouters from './api/product.routes'
import ordersRouters from './api/orders.routes'
import orderProductRouters from './api/orderProduct.routes'

const routes = express.Router()
routes.use('/user', usersRouters)
routes.use('/product', productsRouters)
routes.use('/order', ordersRouters)
routes.use('/orderproduct', orderProductRouters)
export default routes
