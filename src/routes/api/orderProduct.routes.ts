import { Router } from 'express'
import { createOrder, getOrder, getTopFive } from '../../controller/orderProduct.controller'
import { authValidatorMiddleware } from '../../middleware/auth.middleware'
const routes = Router()

routes.post('/create/:id', authValidatorMiddleware, createOrder)
routes.get('/get/:id', authValidatorMiddleware, getOrder)
routes.get('/topfive', getTopFive)
export default routes
