import { Request, Response, NextFunction } from 'express'
import OrderProductModel from '../models/orderProduct.model'

const oP = new OrderProductModel()

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orders } = req.body
    const { id } = req.params
    const newOrder = await oP.createOrderProduct(orders, id)
    res.json({ status: 'success', data: { ...newOrder } })
  } catch (error) {
    next(error)
  }
}

export const getOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const oneOrder = await oP.getOrderProduct(id)
    res.json({ status: 'success', data: { ...oneOrder } })
  } catch (error) {
    next(error)
  }
}

export const getTopFive = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const topFive = await oP.getTopFive()
    res.json({ status: 'success', data: { ...topFive } })
  } catch (error) {
    next(error)
  }
}
