import { Router } from 'express'

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import { AppointmentsController } from '../controllers/AppointmentsController'

export const appointmentsRouter = Router()
const appointmentsController = new AppointmentsController()
appointmentsRouter.use(ensureAuthenticated)

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find()
//   return response.json(appointments)
// })

appointmentsRouter.post('/', appointmentsController.create)
