import { CreditsService } from './services.js'
import { Response } from '../common/response.js'
import createError from 'http-errors'

export const CreditsController = {
  getCredits: async (req, res) => {
    try {
      const credits = await CreditsService.getAll()
      res.render('credits')
      // Response.success(res, 200, 'Lista de clientes', credits)
    } catch (error) {
      console.log(error)
      Response.error(res)
    }
  },
  getCredit: async (req, res) => {
    try {
      const { params: { id } } = req
      const credit = await CreditsService.getById(id)
      if (!credit) return Response.error(res, createError.NotFound())
      Response.success(res, 200, `credits ${id}`, credit)
    } catch (error) {
      console.log(error)
      Response.error(res)
    }
  },
  createCredit: async (req, res) => {
    try {
      const { body } = req
      if (!body || Object.keys(body).length === 0) return Response.error(res, createError.BadRequest())
      const insertedId = await CreditsService.create(body)
      Response.success(res, 201, `Credito ${body.name} agregado `, insertedId)
    } catch (error) {
      console.log(error)
      Response.error(res)
    }
  },
  updateCredit: async (req, res) => {
    try {
      const { params: { id }, body } = req
      if (!body || Object.keys(body).length === 0) return Response.error(res, createError.BadRequest())
      const dataUpdate = {
        $set: {
          ...body
        }
      }
      const result = await CreditsService.update(id, dataUpdate)
      if (result === 0) return Response.error(res, createError.NotFound())
      Response.success(res, 200, 'Credito actualizado')
    } catch (error) {
      console.log(error)
      Response.error(res)
    }
  },
  deleteCredit: async (req, res) => {
    try {
      const { params: { id } } = req
      const product = await CreditsService.getById(id)
      if (!product) return Response.error(res, createError.NotFound())
      await CreditsService.deleteProduct(id)
      Response.success(res, 200, `Credito ${product.name} eliminado con exito`)
    } catch (error) {
      console.log(error)
      Response.error(res)
    }
  }
}
