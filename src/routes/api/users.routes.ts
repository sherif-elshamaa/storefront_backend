import { Router } from 'express'
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  login,
  updateOneUser
} from '../../controller/user.controller'
import { authValidatorMiddleware } from '../../middleware/auth.middleware'
const routes = Router()

routes.post('/create', createUser)
routes.get('/get/:id', authValidatorMiddleware, getUser)
routes.get('/getall', authValidatorMiddleware, getAllUsers)
routes.put('/update', authValidatorMiddleware, updateOneUser)
routes.delete('/delete/:id', authValidatorMiddleware, deleteUser)
routes.get('/login', login)
export default routes
