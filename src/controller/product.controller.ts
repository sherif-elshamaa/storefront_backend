import { Request, Response, NextFunction } from 'express'
import ProductModel from '../models/products.model'

const product = new ProductModel()

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newProduct = await product.createProduct(req.body)
    res.json({ status: 'success', data: { ...newProduct } })
  } catch (error) {
    next(error)
  }
}

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const oneProduct = await product.getOne(id)
    res.json({ status: 'success', data: { ...oneProduct } })
  } catch (error) {
    next(error)
  }
}

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allProducts = await product.getmany()
    res.json({ status: 'success', data: { ...allProducts } })
  } catch (error) {
    next(error)
  }
}

export const updateOneProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedProduct = await product.updateOne(req.body)
    res.json({ status: 'success', data: { ...updatedProduct } })
  } catch (error) {
    next(error)
  }
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const deletedProduct = await product.deleteOne(id)
    res.json({ status: 'success', data: { ...deletedProduct } })
  } catch (error) {
    next(error)
  }
}
