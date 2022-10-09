
### App routes
**user**: create user route: 'api/user/create' [POST] 
**user**: get user route: 'api/user/get/:id' [GET]  protected
**user**: get all users route: 'api/user/getall' [GET] protected
**user**: update user route: 'api/user/update' [PUT] protected
**user**: delete user route: 'api/user/delete/:id' [DELETE] protected
**user**: login user route: 'api/user/login' [GET] 

**order**: create order route: 'api/order/create' [POST] protected
**order**: get order route: 'api/order/get/:id' [GET] protected
**order**: get all orders route: 'api/order/getall' [GET] protected
**order**: update order route: 'api/order/update' [PUT] protected
**order**: delete order route: 'api/order/delete/:id' [DELETE] protected


**product**: create product route: 'api/product/create' [POST] protected
**product**: get product route: 'api/product/get/:id' [GET] 
**product**: get all products route: 'api/product/getall' [GET] 
**product**: update product route: 'api/product/update' [PUT] protected
**product**: delete product route: 'api/product/delete/:id' [DELETE] protected

**orderproduct**: create orderproduct route using order_id: 'api/orderproduct/create/:id' [POST] protected
**orderproduct**: get product route: 'api/orderproduct/get/:id' [GET] protected
**orderproduct**: get product route: 'api/orderproduct//topfive' [GET] 



# SCHEMA
users(
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

product(
  product_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price NUMERIC(10, 3) NOT NULL,
  category VARCHAR(50),
  quantity INT NOT NULL
);

orders(
  order_id SERIAL PRIMARY KEY,
  order_date DATE,
  status VARCHAR(50) NOT NULL,
  user_id INT REFERENCES users(user_id) ON DELETE SET NULL
);

orders_products(
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(order_id),
  product_id INT REFERENCES product(product_id),
  quantity INT NOT NULL
);

# RELATIONS

users **ONE-TO-MANY** orders
orders **ONE-TO-MANY** orders_products
orders_products **MANY-to-ONE** products



