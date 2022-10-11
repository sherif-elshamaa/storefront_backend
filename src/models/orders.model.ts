import db from '../database'
import { OrderDto } from '../dto/order.dto'

class OrderModel {
  async createOrder(order: OrderDto): Promise<OrderDto> {
    try {
      const connection = await db.connect()
      const sql = `INSERT INTO orders (status, user_id, order_date) 
                    values ($1, $2, $3) 
                    RETURNING order_id, order_date, status, user_id`
      const result = await connection.query(sql, [
        order.status,
        order.user_id,
        new Date(Date.now())
      ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`failed on creating order : ${(error as Error).message}`)
    }
  }

  async getOne(order_Id: string): Promise<OrderDto> {
    try {
      const connection = await db.connect()
      const sql = 'SELECT order_id, status, order_date, user_id FROM orders WHERE order_id=($1)'
      const result = await connection.query(sql, [order_Id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`cannot find Order: ${order_Id} : ${(error as Error).message}`)
    }
  }

  async getmany(): Promise<OrderDto[]> {
    try {
      const connection = await db.connect()
      const sql = 'SELECT order_id, status, order_date, user_id FROM orders'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`cannot get all Orders : ${(error as Error).message}`)
    }
  }

  async updateOne(order: OrderDto): Promise<OrderDto> {
    try {
      const connection = await db.connect()
      const sql =
        'UPDATE orders SET status=$1, user_id=$2 WHERE order_id=$3 RETURNING order_id, status, order_date, user_id'
      const result = await connection.query(sql, [order.status, order.user_id, order.order_id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`failed on updating ${order.order_id} : ${(error as Error).message}`)
    }
  }

  async deleteOne(order_id: string): Promise<OrderDto> {
    try {
      const connection = await db.connect()
      const sql =
        'DELETE FROM orders WHERE order_id=$1 RETURNING order_id, status, order_date, user_id'
      const result = await connection.query(sql, [order_id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`failed to delete ${order_id} : ${(error as Error).message}`)
    }
  }
}
export default OrderModel
