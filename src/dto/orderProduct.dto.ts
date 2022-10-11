export class OrderProductDto {
  id?: number
  order_id?: number
  product_id!: number
  quantity!: number
}

export class TopFiveDto {
  product_id!: number
  sum!: number
}
