import { ClientsService } from './services.js'
import { Response } from '../common/response.js'
import createError from 'http-errors'
import { CreditsService } from '../credits/services.js'

export const ClientsController = {
  getClients: async (req, res) => {
    try {
      const clients = await ClientsService.getAll()
      const credits = await CreditsService.getAll()
      const numberOfClients = clients.length
      const numberOfCredits = credits.length
      res.render('home', { numberOfCredits, numberOfClients })
      // Response.success(res, 200, 'Lista de clientes', clients)
    } catch (error) {
      console.log(error)
      Response.error(res)
    }
  },
  getClient: async (req, res) => {
    try {
      const { params: { id } } = req
      const client = await ClientsService.getById(id)
      if (!client) return Response.error(res, createError.NotFound())
      Response.success(res, 200, `cliente ${id}`, client)
    } catch (error) {
      console.log(error)
      Response.error(res)
    }
  },
  createClient: async (req, res) => {
    try {
      const { body } = req
      if (!body || Object.keys(body).length === 0) return Response.error(res, createError.BadRequest())
      const insertedId = await ClientsService.create(body)
      Response.success(res, 201, `Cliente ${body.name} agregado `, insertedId)
    } catch (error) {
      console.log(error)
      Response.error(res)
    }
  },
  updateClient: async (req, res) => {
    try {
      const { params: { id }, body } = req
      if (!body || Object.keys(body).length === 0) return Response.error(res, createError.BadRequest())
      const dataUpdate = {
        $set: {
          ...body
        }
      }
      const result = await ClientsService.update(id, dataUpdate)
      if (result === 0) return Response.error(res, createError.NotFound())
      Response.success(res, 200, 'Cliente actualizado')
    } catch (error) {
      console.log(error)
      Response.error(res)
    }
  },
  deleteClient: async (req, res) => {
    try {
      const { params: { id } } = req
      const product = await ClientsService.getById(id)
      if (!product) return Response.error(res, createError.NotFound())
      await ClientsService.deleteProduct(id)
      Response.success(res, 200, `Cliente ${product.name} eliminado con exito`)
    } catch (error) {
      console.log(error)
      Response.error(res)
    }
  }
}
