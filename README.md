# Storefront Backend Project

1 - To get started, clone this repo and run `npm install` in your terminal at the project root.

2 - Start the dev {npm run dev}

3 - Build {npm run build}

4 - Linting {npm run lint}

5 - Testing {npm run test}

## how to setup and connect to the database

  CREATE DATABASE store_front_dev;

## what ports the backend and database are running on

backend: 5000
POSTGRES_PORT: 5432


# Environment values:
PORT=5000
NODE_ENV=dev
POSTGRES_HOST='127.0.0.1'
POSTGRES_PORT='5432'
POSTGRES_DB='store_front_dev'
POSTGRES_DB_TEST='store_front_test'
POSTGRES_USER='postgres'
POSTGRES_PASSWORD='123'
SALT="10"
PEPPER="bcrypt_password"
TOKEN="mytoken"