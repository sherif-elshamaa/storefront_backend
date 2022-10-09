import { Router } from 'express'
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateOneProduct
} from '../../controller/product.controller'
import { authValidatorMiddleware } from '../../middleware/auth.middleware'
const routes = Router()

routes.post('/create', authValidatorMiddleware, createProduct)
routes.get('/get/:id', getProduct)
routes.get('/getall', getAllProducts)
routes.put('/update', authValidatorMiddleware, updateOneProduct)
routes.delete('/delete/:id', authValidatorMiddleware, deleteProduct)
export default routes
