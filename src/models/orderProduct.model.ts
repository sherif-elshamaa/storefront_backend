import db from '../database'
import { OrderProductDto, TopFiveDto } from '../dto/orderProduct.dto'

class OrderProductModel {
  async createOrderProduct(
    orders: OrderProductDto[],
    order_id: string
  ): Promise<OrderProductDto[]> {
    try {
      const connection = await db.connect()
      console.log(orders)
      const sql = `INSERT INTO orders_products (order_id, product_id, quantity) 
                    values ($1, $2, $3) 
                    RETURNING id, order_id, product_id, quantity`
      for (let i = 0; i < orders.length; i++) {
        await connection.query(sql, [order_id, orders[i].product_id, orders[i].quantity])
      }
      connection.release()
      const result = await connection.query('SELECT * FROM orders_products WHERE order_id=$1', [
        order_id
      ])
      return result.rows
    } catch (error) {
      throw new Error(`failed on creating order : ${(error as Error).message}`)
    }
  }

  async getOrderProduct(order_Id: string): Promise<OrderProductDto[]> {
    try {
      const connection = await db.connect()
      const sql = 'SELECT order_id, status, order_date, user_id FROM orders WHERE order_id=($1)'
      const result = await connection.query(sql, [order_Id])
      connection.release()
      console.log(result.rows)
      if (result.rows.length) {
        return result.rows
      } else {
        throw new Error('Could not find orderProducts')
      }
    } catch (error) {
      throw new Error(`cannot find Order: ${order_Id} : ${(error as Error).message}`)
    }
  }
  async getTopFive(): Promise<TopFiveDto[]> {
    try {
      const connection = await db.connect()
      const sql =
        ' SELECT product_id, SUM(quantity) FROM orders_products GROUP BY product_id ORDER BY SUM(quantity) DESC LIMIT 4;'
      const result = await connection.query(sql)
      connection.release()
      console.log(result.rows)
      if (result.rows.length) {
        return result.rows
      } else {
        throw new Error('Could not find orderProducts')
      }
    } catch (error) {
      throw new Error(`cannot find Orders : ${(error as Error).message}`)
    }
  }
}
export default OrderProductModel
