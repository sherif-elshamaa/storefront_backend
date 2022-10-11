import db from '../database'
import { ProductDto } from '../dto/product.dto'

class ProductModel {
  async createProduct(product: ProductDto): Promise<ProductDto> {
    try {
      const connection = await db.connect()
      const sql = `INSERT INTO product (name, price, quantity, category) 
                    values ($1, $2, $3, $4) 
                    RETURNING product_id, name, price, quantity, category`
      const result = await connection.query(sql, [
        product.name,
        product.price,
        product.quantity,
        product.category
      ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`failed on creating ${product.name} : ${(error as Error).message}`)
    }
  }

  async getOne(product_Id: string): Promise<ProductDto> {
    try {
      const connection = await db.connect()
      const sql =
        'SELECT Product_id, name, price, quantity, category FROM product WHERE product_id=($1)'
      const result = await connection.query(sql, [product_Id])
      connection.release()
      if (result.rows.length) {
        return result.rows[0]
      } else {
        throw new Error('Could not find product')
      }
    } catch (error) {
      throw new Error(`cannot find product: ${product_Id} : ${(error as Error).message}`)
    }
  }

  async getmany(): Promise<ProductDto[]> {
    try {
      const connection = await db.connect()
      const sql = 'SELECT Product_id, name, price, quantity, category FROM product'
      const result = await connection.query(sql)
      connection.release()
      if (result.rows.length) {
        return result.rows
      } else {
        throw new Error('Could not find products')
      }
    } catch (error) {
      throw new Error(`cannot get all products : ${(error as Error).message}`)
    }
  }

  async updateOne(product: ProductDto): Promise<ProductDto> {
    try {
      const connection = await db.connect()
      const sql =
        'UPDATE product SET name=$1, price=$2, quantity=$3, category=$4 WHERE product_id=$5 RETURNING product_id, name, price, quantity, category'
      const result = await connection.query(sql, [
        product.name,
        product.price,
        product.quantity,
        product.category,
        product.product_id
      ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`failed on updating ${product.name} : ${(error as Error).message}`)
    }
  }

  async deleteOne(product_id: string): Promise<ProductDto> {
    try {
      const connection = await db.connect()
      const sql =
        'DELETE FROM product WHERE product_id=$1 RETURNING product_id, name, price, quantity, category'
      const result = await connection.query(sql, [product_id])
      connection.release()
      if (result.rows.length) {
        return result.rows[0]
      } else {
        throw new Error('product not find or already deleted')
      }
    } catch (error) {
      throw new Error(`failed to delete ${product_id} : ${(error as Error).message}`)
    }
  }
}
export default ProductModel
