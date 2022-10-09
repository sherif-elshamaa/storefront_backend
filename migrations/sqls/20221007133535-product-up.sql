CREATE TABLE product(
  product_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price NUMERIC(10, 3) NOT NULL,
  category VARCHAR(50),
  quantity INT NOT NULL
);