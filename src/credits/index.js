import { Router } from 'express'
import { CreditsController } from './controller.js'
const router = Router()

export function creditsAPI (app) {
  router
    .get('/', CreditsController.getCredits) // http://localhost:3000/api/credits/
    .get('/:id', CreditsController.getCredit) // http://localhost:3000/api/credits/23
    .post('/', CreditsController.createCredit)
    .put('/:id', CreditsController.updateCredit)
    .delete('/:id', CreditsController.deleteCredit)

  app.use('/credits', router)
}
