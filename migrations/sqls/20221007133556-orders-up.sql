CREATE TABLE orders(
  order_id SERIAL PRIMARY KEY,
  order_date DATE,
  status VARCHAR(50) NOT NULL,
  user_id INT REFERENCES users(user_id) ON DELETE SET NULL
);