import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config/index'

export const authValidatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader?.split(' ')[1]
    jwt.verify(token as unknown as string, config.token as unknown as string)
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: 'unauthorized' })
  }
}
