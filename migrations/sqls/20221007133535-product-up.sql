CREATE TABLE product(
  product_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price INT NOT NULL,
  category VARCHAR(50),
  quantity INT NOT NULL
);