import { ObjectId } from 'mongodb'
import { Database } from '../database/index.js'

const COLLECTION = 'clients'

/**
 *
 * @returns return one array of objects
 */
const getAll = async () => {
  const collection = await Database(COLLECTION)
  return await collection.find({}).toArray()
}

const getById = async (id) => {
  const collection = await Database(COLLECTION)
  return await collection.findOne({ _id: new ObjectId(id) })
}

const create = async (product) => {
  const collection = await Database(COLLECTION)
  const result = await collection.insertOne(product)
  return result.insertedId
}

const update = async (id, dataUpdate) => {
  const collection = await Database(COLLECTION)
  const result = await collection.updateOne({ _id: new ObjectId(id) }, dataUpdate)
  return result.matchedCount
}

const deleteProduct = async (id) => {
  const collection = await Database(COLLECTION)
  const result = await collection.deleteOne({ _id: new ObjectId(id) })
  return result.deletedCount
}

export const ClientsService = {
  getAll,
  getById,
  create,
  update,
  deleteProduct
}
