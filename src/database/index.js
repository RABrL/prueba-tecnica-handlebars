import { MongoClient } from 'mongodb'
import { Config } from '../config/index.js'

let connection = null

export function Database (collection) {
  return new Promise(async (resolve, reject) => {
    try {
    // singelton
      if (!connection) {
        const client = new MongoClient(Config.mongoUri)
        connection = await client.connect()
        console.log('Nueva conexion realizada con mongo atlas')
      }
      console.log('Reutilizando conexion')
      const db = connection.db(Config.mongoDbname)
      resolve(db.collection(collection))
    } catch (err) {
      reject(err)
    }
  })
}
