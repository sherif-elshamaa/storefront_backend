import db from '../database'
import { UserDto } from '../dto/user.dto'
import bcrypt from 'bcrypt'
import config from '../config/index'

const hash = (password: string) => {
  const salt = parseInt(config.salt as string, 10)
  return bcrypt.hashSync(`${password}${config.pepper}`, salt)
}

class UserModel {
  async createUser(user: UserDto): Promise<UserDto> {
    try {
      const connection = await db.connect()
      const sql = `INSERT INTO users (first_name, last_name, email, password) 
                    values ($1, $2, $3, $4) 
                    RETURNING user_id, first_name, last_name, email`
      const result = await connection.query(sql, [
        user.first_name,
        user.last_name,
        user.email,
        hash(user.password as string)
      ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`failed on creating ${user.email} : ${(error as Error).message}`)
    }
  }

  async getOne(userId: string): Promise<UserDto> {
    try {
      const connection = await db.connect()
      const sql = 'SELECT user_id, first_name, last_name, email FROM users WHERE user_id=($1)'
      const result = await connection.query(sql, [userId])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`cannot find user: ${userId} : ${(error as Error).message}`)
    }
  }

  async getmany(): Promise<UserDto[]> {
    try {
      const connection = await db.connect()
      const sql = 'SELECT user_id, first_name, last_name, email FROM users'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`cannot get all users : ${(error as Error).message}`)
    }
  }

  async updateOne(user: UserDto): Promise<UserDto> {
    try {
      const connection = await db.connect()
      const sql =
        'UPDATE users SET first_name=$1, last_name=$2, email=$3, password=$4 WHERE user_id=$5 RETURNING user_id, first_name, last_name, email'
      const result = await connection.query(sql, [
        user.first_name,
        user.last_name,
        user.email,
        hash(user.password as string),
        user.user_id
      ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`failed on updating ${user.email} : ${(error as Error).message}`)
    }
  }

  async deleteOne(user_id: string): Promise<UserDto> {
    try {
      const connection = await db.connect()
      const sql =
        'DELETE FROM users WHERE user_id=$1 RETURNING user_id, first_name, last_name, email'
      const result = await connection.query(sql, [user_id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`failed to delete ${user_id} : ${(error as Error).message}`)
    }
  }

  async auth(email: string, password: string): Promise<UserDto | null> {
    try {
      const connection = await db.connect()
      const sql = 'SELECT password FROM users WHERE email=$1'
      const result = await connection.query(sql, [email])
      if (result.rows.length) {
        const hashedpassword = result.rows[0].password
        const isPasswordCorrect = bcrypt.compareSync(`${password}${config.pepper}`, hashedpassword)
        if (isPasswordCorrect) {
          const sql2 = 'SELECT user_id, first_name, last_name, email FROM users WHERE email=$1'
          const user = await connection.query(sql2, [email])
          return user.rows[0]
        }
      }
      connection.release()
      return null
    } catch (error) {
      throw new Error(`failed to login : ${(error as Error).message}`)
    }
  }
}
export default UserModel
