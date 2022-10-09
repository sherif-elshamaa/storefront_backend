# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `npm install` in your terminal at the project root.



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

