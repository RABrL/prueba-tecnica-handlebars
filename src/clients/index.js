import { Router } from 'express'
import { ClientsController } from './controller.js'
const router = Router()

export function clientsAPI (app) {
  router
    .get('/', ClientsController.getClients) // http://localhost:3000/api/clients/
    .get('/:id', ClientsController.getClient) // http://localhost:3000/api/clients/23
    .post('/', ClientsController.createClient)
    .put('/:id', ClientsController.updateClient)
    .delete('/:id', ClientsController.deleteClient)

  app.use('/clients', router)
}
