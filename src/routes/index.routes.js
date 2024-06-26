import { Router } from 'express'
import indexRoutes from '../controllers/index.controller.js'

const router = Router()

router.get('/', indexRoutes.index)

export default router
