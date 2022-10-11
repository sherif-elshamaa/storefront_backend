import { Request, Response, NextFunction } from 'express'
import UserModel from '../models/user.model'
import config from '../config/index'
import jwt from 'jsonwebtoken'

const user = new UserModel()

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = await user.createUser(req.body)
    res.json({ status: 'success', data: { ...newUser } })
  } catch (error) {
    next(error)
  }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const oneUser = await user.getOne(id)
    res.json({ status: 'success', data: { ...oneUser } })
  } catch (error) {
    next(error)
  }
}

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allUsers = await user.getmany()
    res.json({ status: 'success', data: [...allUsers] })
  } catch (error) {
    next(error)
  }
}

export const updateOneUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedUser = await user.updateOne(req.body)
    res.json({ status: 'success', data: { ...updatedUser } })
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const deletedUser = await user.deleteOne(id)
    res.json({ status: 'success', data: { ...deletedUser } })
  } catch (error) {
    next(error)
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    const loginedUser = await user.auth(email, password)
    const token = jwt.sign({ loginedUser }, config.token as unknown as string)
    if (!loginedUser) {
      return res.status(401).json({ status: 'error', message: 'email and password are incorrect' })
    }
    return res.json({ status: 'success', data: { ...loginedUser, token } })
  } catch (error) {
    next(error)
  }
}
