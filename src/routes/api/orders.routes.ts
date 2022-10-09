import { Router } from 'express'
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrder,
  updateOneOrder
} from '../../controller/order.controller'
import { authValidatorMiddleware } from '../../middleware/auth.middleware'
const routes = Router()

routes.post('/create', authValidatorMiddleware, createOrder)
routes.get('/get/:id', authValidatorMiddleware, getOrder)
routes.get('/getall', authValidatorMiddleware, getAllOrders)
routes.put('/update', authValidatorMiddleware, updateOneOrder)
routes.delete('/delete/:id', authValidatorMiddleware, deleteOrder)
export default routes
