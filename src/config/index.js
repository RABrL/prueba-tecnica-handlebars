import * as dotenv from 'dotenv'
dotenv.config()

export const Config = {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  mongoDbname: process.env.MONGO_DBNAME
}
