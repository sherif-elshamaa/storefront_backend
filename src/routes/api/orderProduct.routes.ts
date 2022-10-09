import { Router } from 'express'
import { createOrder, getOrder } from '../../controller/orderProduct.controller'
import { authValidatorMiddleware } from '../../middleware/auth.middleware'
const routes = Router()

routes.post('/create/:id', authValidatorMiddleware, createOrder)
routes.get('/get/:id', authValidatorMiddleware, getOrder)
export default routes
