CREATE TABLE orders_products(
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(order_id),
  product_id INT REFERENCES product(product_id),
  quantity INT NOT NULL
);
