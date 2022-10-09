import { Request, Response, NextFunction } from 'express'
import OrderModel from '../models/orders.model'

const order = new OrderModel()

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newOrder = await order.createOrder(req.body)
    res.json({ status: 'success', data: { ...newOrder } })
  } catch (error) {
    next(error)
  }
}

export const getOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const oneOrder = await order.getOne(id)
    res.json({ status: 'success', data: { ...oneOrder } })
  } catch (error) {
    next(error)
  }
}

export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allOrders = await order.getmany()
    res.json({ status: 'success', data: { ...allOrders } })
  } catch (error) {
    next(error)
  }
}

export const updateOneOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedOrder = await order.updateOne(req.body)
    res.json({ status: 'success', data: { ...updatedOrder } })
  } catch (error) {
    next(error)
  }
}

export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const deletedOrder = await order.deleteOne(id)
    res.json({ status: 'success', data: { ...deletedOrder } })
  } catch (error) {
    next(error)
  }
}
